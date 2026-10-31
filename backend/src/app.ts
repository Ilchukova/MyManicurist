
import Fastify, { type FastifyError } from "fastify";
import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import swagger from "@fastify/swagger";
import { STATUS_CODES } from "node:http";
import { Type as T } from "@sinclair/typebox";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

import { masters } from "./data/masters.js";
import prismaPlugin from "./plugins/prisma.js";

import {
  ValidationProblem,
  ProblemDetails,
  User,
  Health,
} from "./types.js";

export async function buildApp() {
  const app = Fastify({
    logger: true,
    trustProxy: true,

    schemaErrorFormatter(errors, dataVar) {
      const message =
        errors
          .map((error) => error.message)
          .filter(Boolean)
          .join("; ") || "Validation failed";

      return new ValidationProblem(message, errors, dataVar);
    },
  }).withTypeProvider<TypeBoxTypeProvider>();

  // Инфраструктурные плагины

  await app.register(helmet);

  await app.register(cors, {
    origin: [
      /^https:\/\/ilchukova\.github\.io$/,
      /^http:\/\/localhost:\d+$/,
      /^http:\/\/127\.0\.0\.1:\d+$/,
    ],
    credentials: false,
  });

  await app.register(rateLimit, {
    max: 100,
    timeWindow: "1 minute",
    enableDraftSpec: true,
    addHeaders: {
      "x-ratelimit-limit": true,
      "x-ratelimit-remaining": true,
      "x-ratelimit-reset": true,
      "retry-after": true,
    },
    errorResponseBuilder(request, context) {
      const seconds = Math.ceil(context.ttl / 1000);

      return {
        type: "about:blank",
        title: "Too Many Requests",
        status: 429,
        detail: `Rate limit exceeded. Retry in ${seconds} seconds.`,
        instance: request.url,
      } satisfies ProblemDetails;
    },
  });

  await app.register(swagger, {
    openapi: {
      openapi: "3.1.0",
      info: {
        title: "MyManicurist API",
        version: "1.0.0",
        description:
          "HTTP API сервиса MyManicurist. Ошибки возвращаются в формате Problem Details.",
      },
      servers: [{ url: "http://localhost:3000" }],
      tags: [
        {
          name: "Users",
          description: "Маршруты пользователей",
        },
        {
          name: "System",
          description: "Служебные маршруты",
        },
        {
          name: "Masters",
          description: "Каталог мастеров маникюра",
        },
      ],
    },
  });

  // Подключение Prisma к Fastify.
  // После регистрации доступен app.prisma.

  await app.register(prismaPlugin);

  // Глобальная обработка ошибок

  app.setErrorHandler<FastifyError | ValidationProblem>(
    (error, request, reply) => {
      request.log.error(error);

      const status =
        typeof error.statusCode === "number" &&
        error.statusCode >= 400 &&
        error.statusCode <= 599
          ? error.statusCode
          : 500;

      const isValidation = error instanceof ValidationProblem;

      const problem = {
        type: "about:blank",
        title: STATUS_CODES[status] ?? "Error",
        status,
        detail:
          status >= 500
            ? "Внутренняя ошибка сервера"
            : error.message || "Unexpected error",
        instance: request.url,
        ...(isValidation ? { errorsText: error.message } : {}),
      };

      reply
        .code(status)
        .type("application/problem+json")
        .send(problem);
    },
  );

  // Обработка несуществующих маршрутов

  app.setNotFoundHandler((request, reply) => {
    reply.code(404).type("application/problem+json").send({
      type: "about:blank",
      title: "Not Found",
      status: 404,
      detail: `Route ${request.method} ${request.url} not found`,
      instance: request.url,
    } satisfies ProblemDetails);
  });

  // Проверка работоспособности сервера и PostgreSQL

  app.get(
    "/api/health",
    {
      schema: {
        operationId: "health",
        tags: ["System"],
        summary: "Health/Readiness",
        description:
          "Проверяет, что процесс жив и база данных отвечает.",
        response: {
          200: {
            description: "Ready",
            content: {
              "application/json": {
                schema: Health,
              },
            },
          },
          503: {
            description: "Temporarily unavailable",
            content: {
              "application/problem+json": {
                schema: ProblemDetails,
              },
            },
          },
        },
      },
    },
    async (_request, reply) => {
      try {
        await app.prisma.$queryRaw`SELECT 1`;

        return { ok: true } satisfies Health;
      } catch (error) {
        app.log.error(error, "Database health check failed");

        return reply
          .code(503)
          .type("application/problem+json")
          .send({
            type: "https://example.com/problems/dependency-unavailable",
            title: "Service Unavailable",
            status: 503,
            detail: "Database ping failed",
            instance: "/api/health",
          } satisfies ProblemDetails);
      }
    },
  );

  // Список пользователей из PostgreSQL

  app.get(
    "/api/users",
    {
      schema: {
        operationId: "listUsers",
        tags: ["Users"],
        summary: "Возвращает список пользователей",
        response: {
          200: {
            description: "Список пользователей",
            content: {
              "application/json": {
                schema: T.Array(User),
              },
            },
          },
          429: {
            description: "Превышен лимит запросов",
            content: {
              "application/problem+json": {
                schema: ProblemDetails,
              },
            },
          },
          500: {
            description: "Внутренняя ошибка сервера",
            content: {
              "application/problem+json": {
                schema: ProblemDetails,
              },
            },
          },
        },
      },
    },
    async () =>
      app.prisma.user.findMany({
        select: {
          id: true,
          email: true,
        },
      }),
  );

  // Каталог мастеров с пагинацией.
  // Пока мастера остаются в существующем хранилище.

  app.get(
    "/api/masters",
    {
      schema: {
        operationId: "listMasters",
        tags: ["Masters"],
        summary: "Возвращает страницу каталога мастеров",
        querystring: T.Object({
          page: T.Optional(T.String()),
          pageSize: T.Optional(T.String()),
        }),
        response: {
          200: {
            description: "Страница каталога мастеров",
            content: {
              "application/json": {
                schema: T.Object({
                  items: T.Array(T.Any()),
                  page: T.Integer(),
                  total: T.Integer(),
                }),
              },
            },
          },
          429: {
            description: "Превышен лимит запросов",
            content: {
              "application/problem+json": {
                schema: ProblemDetails,
              },
            },
          },
          500: {
            description: "Внутренняя ошибка сервера",
            content: {
              "application/problem+json": {
                schema: ProblemDetails,
              },
            },
          },
        },
      },
    },
    async (request) => {
      const page = Math.max(1, Number(request.query.page) || 1);

      const pageSize = Math.min(
        100,
        Math.max(1, Number(request.query.pageSize) || 12),
      );

      const start = (page - 1) * pageSize;

      return {
        items: masters.slice(start, start + pageSize),
        page,
        total: masters.length,
      };
    },
  );

  // OpenAPI JSON. Не включаем этот технический маршрут в спецификацию.

  app.get(
    "/openapi.json",
    {
      schema: {
        hide: true,
      },
    },
    async (_request, reply) => {
      return reply.type("application/json").send(app.swagger());
    },
  );

  return app;
}
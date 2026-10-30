import type {
  FastifyError,
  FastifySchemaValidationError,
} from "fastify";
import type { SchemaErrorDataVar } from "fastify/types/schema.js";
import { Type as T, type Static } from "@sinclair/typebox";

// Схемы используются для проверки данных и генерации документации OpenAPI.

/**
 * Обёртка над ошибкой валидации Fastify.
 * Позволяет передавать сообщение об ошибке и сведения о том,
 * какие данные не прошли проверку.
 */
export class ValidationProblem extends Error implements FastifyError {
  public readonly name = "ValidationError";
  public readonly code = "FST_ERR_VALIDATION";
  public readonly statusCode = 400;
  public readonly validation: FastifySchemaValidationError[];
  public readonly validationContext: SchemaErrorDataVar;

  constructor(
    message: string,
    errs: FastifySchemaValidationError[],
    ctx: SchemaErrorDataVar,
    options?: ErrorOptions,
  ) {
    super(message, options);

    this.validation = errs;
    this.validationContext = ctx;
  }
}

// Единая схема ошибки API в формате RFC 9457 (Problem Details).
export const ProblemDetails = T.Object(
  {
    type: T.String({
      description:
        "URI с подробным описанием ошибки. По умолчанию используется about:blank",
    }),
    title: T.String({
      description: "Краткое человекочитаемое описание проблемы",
    }),
    status: T.Integer({
      minimum: 100,
      maximum: 599,
      description: "HTTP-статус, с которым был отправлен ответ",
    }),
    detail: T.Optional(
      T.String({
        description: "Дополнительные сведения о возникшей проблеме",
      }),
    ),
    instance: T.Optional(
      T.String({
        description: "URI запроса, в котором возникла проблема",
      }),
    ),
    errorsText: T.Optional(
      T.String({
        description:
          "Сводное описание ошибок, обнаруженных при валидации данных",
      }),
    ),
  },
  {
    additionalProperties: true,
  },
);

export type ProblemDetails = Static<typeof ProblemDetails>;

// Схема и TypeScript-тип пользователя.
export const User = T.Object({
  id: T.String({
    description: "Уникальный идентификатор пользователя",
  }),
  email: T.String({
    format: "email",
    description: "Адрес электронной почты пользователя",
  }),
});

export type User = Static<typeof User>;

// Схема и TypeScript-тип проверки работоспособности сервера.
export const Health = T.Object({
  ok: T.Boolean({
    description: "Флаг готовности сервиса",
  }),
});

export type Health = Static<typeof Health>;
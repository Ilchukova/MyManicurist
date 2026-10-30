import { http, HttpResponse } from "msw";
import { masters } from "../data/mock/masters";

const DEFAULT_PAGE_SIZE = 12;

export const handlers = [
  http.get("/api/masters", ({ request }) => {
    const url = new URL(request.url);

    const page = Math.max(
      1,
      Number(url.searchParams.get("page") ?? "1") || 1
    );

    const pageSize = Math.max(
      1,
      Number(url.searchParams.get("pageSize") ?? DEFAULT_PAGE_SIZE) ||
        DEFAULT_PAGE_SIZE
    );

    const total = masters.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const currentPage = Math.min(page, totalPages);

    const start = (currentPage - 1) * pageSize;
    const items = masters.slice(start, start + pageSize);

    const response = {
      items,
      page: currentPage,
      total,
    };

    console.log("[MSW] Отдаём мастеров:", response);

    return HttpResponse.json(response);
  }),
];

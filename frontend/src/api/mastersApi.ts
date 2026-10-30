import { http } from "./http";
import type { Master } from "../types";

export interface MastersResponseDto {
  items: Master[];
  page: number;
  total: number;
}

export async function fetchMasters(
  page = 1,
  pageSize = 12
): Promise<MastersResponseDto> {
  const { data } = await http.get<MastersResponseDto>("/masters", {
    params: { page, pageSize },
  });

  return data;
}

export async function getMasters(): Promise<Master[]> {
  const data = await fetchMasters(1);
  return data.items;
}
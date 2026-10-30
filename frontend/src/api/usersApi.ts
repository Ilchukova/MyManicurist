import type { CurrentUser } from "../types";

export async function loginUser(
  name: string,
  role: CurrentUser["role"]
): Promise<CurrentUser> {
  return Promise.resolve({
    name,
    role,
    masterId: role === "master" ? "m3" : undefined,
  });
}
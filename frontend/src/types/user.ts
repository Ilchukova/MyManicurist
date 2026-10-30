export type UserRole = "client" | "master";

export interface CurrentUser {
  name: string;
  role: UserRole;
  masterId?: string;
}

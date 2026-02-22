import { api } from "./api";
import type { User } from "../types/user.ts";

export const register = async (full_name: string, email: string, password: string): Promise<{ user: User }> => {
  return api("/auth/register", {
    method: "POST",
    body: { full_name, email, password }
  });
};

export const login = async (email: string, password: string): Promise<void> => {
  await api<void>("/auth/login", {
    method: "POST",
    body: { email, password }
  });
};

export const logout = async (): Promise<void> => {
  await api<void>("/auth/logout", { method: "POST" });
};


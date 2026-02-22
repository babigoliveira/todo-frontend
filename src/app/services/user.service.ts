import { api } from "./api";
import type { User } from "../types/user";

export const userProfile = async (): Promise<User> => {
  return api<User>("/user");
};

export const updateName = async (full_name: string): Promise<User> => {
  return api<User>("/user", {
    method: "PATCH",
    body: { full_name }
  });
};

export const updatePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
  await api<void>("/user/password", {
    method: "PATCH",
    body: { currentPassword, newPassword: newPassword }
  });
};

import { api } from "./api";
import type { ToDo } from "../types/todo";

export const getAllTasks = async (): Promise<ToDo[]> => {
  return api<ToDo[]>("/todo");
};

export const addTask = async (task: string, flag: "high" | "medium" | "low"): Promise<ToDo> => {
  return api<ToDo>("/todo", {
    method: "POST",
    body: { task, flag }
  });
};

export const updateTask = async (id: string, data: Partial<Pick<ToDo, "task" | "done" | "flag">>): Promise<ToDo> => {
  return api<ToDo>(`/todo/${id}`, {
    method: "PATCH",
    body: data
  });
};

export const removeTask = async (id: string): Promise<void> => {
  await api<void>(`/todo/${id}`, { method: "DELETE" });
};

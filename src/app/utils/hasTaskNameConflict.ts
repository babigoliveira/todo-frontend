import type { ToDo } from "../types/todo";

export const hasTaskNameConflict = (tasks: ToDo[], taskName: string, editingTaskId?: string): boolean => {
  const trimmedName = taskName.trim().toLowerCase();

  if (!trimmedName) return false;

  return tasks.some(task => task.task.toLowerCase() === trimmedName && task.id !== editingTaskId);
};

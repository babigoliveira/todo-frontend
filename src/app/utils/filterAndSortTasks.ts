import type { ToDo } from "../types/todo";

type Tab = "pending" | "done" | "all";

export const filterAndSortTasks = (tasks: ToDo[], activeTab: Tab): ToDo[] => {
  const flagPriority = {
    high: 1,
    medium: 2,
    low: 3
  } as const;

  return tasks
    .filter(task => {
      if (activeTab === "done") return task.done;
      if (activeTab === "pending") return !task.done;
      return true;
    })
    .sort((a, b) => flagPriority[a.flag] - flagPriority[b.flag]);
};

import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { addTask, getAllTasks, removeTask, updateTask } from "../services/todo.service";
import type { ToDo } from "../types/todo";
import { hasTaskNameConflict } from "../utils/hasTaskNameConflict";
type TaskInput = {
  title: string;
  flag: "high" | "medium" | "low";
};

export const useTasks = () => {
  const [tasks, setTasks] = useState<ToDo[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = useCallback(async () => {
    const response = await getAllTasks();
    setTasks(response);
  }, []);

  const createTask = async ({ title, flag }: TaskInput) => {
    if (hasTaskNameConflict(tasks, title)) {
      toast.warn("Já existe uma tarefa com esse nome!");
      return false;
    }

    setLoading(true);
    try {
      const newTask = await addTask(title, flag);
      setTasks(prev => [...prev, newTask]);
      toast.success("Tarefa adicionada com sucesso!");
      return true;
    } catch (error) {
      toast.error("Erro ao criar tarefa");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const editTask = async (taskId: string, { title, flag }: TaskInput) => {
    const currentTask = tasks.find(task => task.id === taskId);

    if (!currentTask) return false;

    const sameTitle = currentTask.task.trim().toLowerCase() === title.trim().toLowerCase();
    const sameFlag = currentTask.flag === flag;

    if (sameTitle && sameFlag) {
      toast.warn("Nenhuma alteração foi feita.");
      return false;
    }

    setLoading(true);
    try {
      const updated = await updateTask(taskId, {
        task: title,
        flag
      });

      setTasks(prev => prev.map(task => (task.id === updated.id ? updated : task)));
      toast.success("Tarefa atualizada com sucesso!");
      return true;
    } catch {
      toast.error("Erro ao atualizar tarefa");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = async (id: string, done: boolean) => {
    try {
      const updated = await updateTask(id, { done: !done });
      setTasks(prev => prev.map(task => (task.id === id ? updated : task)));
    } catch {
      toast.error("Erro ao atualizar tarefa");
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await removeTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
      toast.success("Tarefa removida");
    } catch {
      toast.error("Erro ao remover tarefa");
    }
  };

  return {
    tasks,
    loading,
    fetchTasks,
    createTask,
    editTask,
    toggleTask,
    deleteTask
  };
};

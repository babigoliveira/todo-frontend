"use client";

import { useCallback, useEffect, useState } from "react";
import { Modal } from "./components/Modal";
import { toast } from "react-toastify";
import { ActionButton } from "./components/ActionButton";
import { TaskList } from "./components/TaskList";
import { Tabs } from "./components/Tabs";
import { Header } from "./components/Header";
import { addTask, getAllTasks, removeTask, updateTask } from "./services/todo.service";
import { me } from "./services/auth.service";
import { useRouter } from "next/navigation";
import type { ToDo } from "./types/todo";

type TaskFormData = {
  title: string;
  flag: "high" | "medium" | "low";
};

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"pending" | "done" | "all">("pending");
  const [tasks, setTasks] = useState<ToDo[]>([]);
  const [editingTask, setEditingTask] = useState<ToDo | null>(null);
  const [userName, setUserName] = useState<string>("");

  const router = useRouter();

  const fetchTasks = useCallback(async () => {
    const response = await getAllTasks();
    setTasks(response);
  }, []);

  const flagPriority = {
    high: 1,
    medium: 2,
    low: 3
  } as const;

  const filteredAndSortedTasks = tasks
    .filter(task => {
      if (activeTab === "done") return task.done;
      if (activeTab === "pending") return !task.done;
      return true;
    })
    .sort((a, b) => flagPriority[a.flag] - flagPriority[b.flag]);

  const handleSubmit = async (data: TaskFormData) => {
    const taskTrimmed = data.title.trim().toLowerCase();

    if (!taskTrimmed) {
      return toast.warn("A tarefa não pode estar vazia!");
    }

    if (taskTrimmed && tasks.some(task => task.task.toLowerCase() === taskTrimmed && task.id !== editingTask?.id)) {
      return toast.warn("Já existe uma tarefa com esse nome!");
    }

    setModalLoading(true);

    try {
      if (editingTask) {
        const updatedTask = await updateTask(editingTask.id, {
          task: data.title,
          flag: data.flag
        });

        setTasks(prev => prev.map(task => (task.id === updatedTask.id ? updatedTask : task)));
        setEditingTask(null);
        setOpenModal(false);
        toast.success("Tarefa atualizada com sucesso!");
      } else {
        const newTask = await addTask(data.title, data.flag);
        setTasks(prev => [...prev, newTask]);
        setOpenModal(false);
        toast.success("Tarefa adicionada com sucesso!");
      }
    } catch (error) {
      toast.error(String(error));
    } finally {
      setModalLoading(false);
    }
  };

  const handleToggle = async (todoId: string, done: boolean) => {
    try {
      const updatedTask = await updateTask(todoId, { done: !done });
      setTasks(prev => prev.map(task => (task.id === todoId ? updatedTask : task)));
      toast.success("Tarefa atualizada com sucesso!");
    } catch (error) {
      toast.error(String(error));
    } finally {
      setModalLoading(false);
    }
  };

  const handleDelete = async (todoId: string) => {
    try {
      await removeTask(todoId);
      setTasks(prev => prev.filter(task => task.id !== todoId));
      toast.success("Tarefa removida com sucesso!");
    } catch (error) {
      toast.error(String(error));
    }
  };

  const handleOpenEdit = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    setEditingTask(task);
    setOpenModal(true);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const user = await me();
        setUserName(user.full_name);
        console.log(user);
        await fetchTasks();
      } catch {
        router.push("/login");
      }
    };

    load();
  }, [fetchTasks, router]);

  return (
    <div>
      <Header userName={userName} />
      <main className="mx-auto w-full max-w-md md:max-w-lg lg:max-w-3xl py-6 align-items-start">
        <div className="px-4 pt-6 pb-4 flex justify-center">
          <ActionButton text="+ Nova tarefa" onClick={() => setOpenModal(true)} className="w-[250px]" />
        </div>

        <Tabs active={activeTab} onChange={setActiveTab} />

        <TaskList
          tasks={filteredAndSortedTasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleOpenEdit}
        />

        {openModal && (
          <Modal
            onClose={() => {
              setOpenModal(false);
              setEditingTask(null);
            }}
            onSuccess={handleSubmit}
            initialData={editingTask}
            loading={modalLoading}
          />
        )}
      </main>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { ActionButton } from "./components/ActionButton";
import { TaskList } from "./components/TaskList";
import { Tabs } from "./components/Tabs";
import { Header } from "./components/Header";

import { useRouter } from "next/navigation";
import type { ToDo } from "./types/todo";
import { useTasks } from "./hooks/useTaks";
import { filterAndSortTasks } from "./utils/filterAndSortTasks";
import { TaskForm } from "./components/forms/TaskForms";
import { userProfile } from "./services/user.service";

type TaskFormData = {
  title: string;
  flag: "high" | "medium" | "low";
};

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"pending" | "done" | "all">("pending");
  const [editingTask, setEditingTask] = useState<ToDo | null>(null);
  const [userName, setUserName] = useState<string>("");

  const router = useRouter();
  const { tasks, loading, fetchTasks, createTask, editTask, toggleTask, deleteTask } = useTasks();

  const filteredTasks = filterAndSortTasks(tasks, activeTab);

  const handleSubmit = async (data: TaskFormData) => {
    const success = editingTask ? await editTask(editingTask.id, data) : await createTask(data);

    if (!success) return; 

    setEditingTask(null);
    setOpenModal(false);
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
        const user = await userProfile();
        setUserName(user.full_name);
        await fetchTasks();
      } catch {
        router.push("/login");
      }
    };

    load();
  }, [fetchTasks, router]);

  return (
    <div>
      <Header userName={userName} onUserUpdated={setUserName} />
      <main className="mx-auto w-full max-w-md md:max-w-lg lg:max-w-3xl py-6 align-items-start">
        <div className="px-4 pt-6 pb-4 flex justify-center">
          <ActionButton text="+ Nova tarefa" onClick={() => setOpenModal(true)} className="w-[250px]" />
        </div>

        <Tabs active={activeTab} onChange={setActiveTab} />

        <TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} onEdit={handleOpenEdit} />

        {openModal && (
          <TaskForm
            onClose={() => {
              setOpenModal(false);
              setEditingTask(null);
            }}
            onSuccess={handleSubmit}
            initialData={editingTask}
            loading={loading}
          />
        )}
      </main>
    </div>
  );
}

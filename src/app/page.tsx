"use client";

import { useCallback, useEffect, useState } from "react";
import { Modal } from "./components/Modal";
import { Background } from "./components/Background";
import { addTask, getAllTasks, removeTask, updateTask } from "./services/todo-service";
import { toast } from "react-toastify";
import { ActionButton } from "./components/ActionButton";
import { TaskList } from "./components/TaskList";
import { Tabs } from "./components/Tabs";
import { Header } from "./components/Header";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "done" | "pending">("all");
  const [tasks, setTasks] = useState<ToDo[]>([]);
  const [editingTask, setEditingTask] = useState<ToDo | null>(null);

  const fetchTasks = useCallback(async () => {
    const response = await getAllTasks();
    setTasks(response);
  }, []);

  const flagPriority = {
    high: 1,
    medium: 2,
    low: 3
  } as const;

  const filterAnsSortTasks = tasks
    .filter(task => {
      if (activeTab === "done") return task.done;
      if (activeTab === "pending") return !task.done;
      return true;
    })
    .sort((a, b) => flagPriority[a.flag] - flagPriority[b.flag]);

  const handleSubmit = async (data: { title: string; flag: "high" | "medium" | "low" }) => {
    const taskTrimmed = data.title.trim().toLowerCase();

    if (!taskTrimmed) {
      return toast.warn("A tarefa não pode estar vazia!");
    }

    if (editingTask) {
      try {
        const updatedTask = await updateTask(editingTask.id, {
          task: data.title,
          flag: data.flag
        });

        setTasks(prev => prev.map(t => (t.id === updatedTask.id ? updatedTask : t)));
        setEditingTask(null);
        setOpenModal(false);
        toast.success("Tarefa atualizada com sucesso!");
        return;
      } catch (error) {
        toast.error(String(error));
        return;
      }
    }

    if (tasks.some(task => task.task.toLowerCase() === taskTrimmed)) {
      return toast.warn("Já existe uma tarefa com esse nome!");
    }

    try {
      const newTask = await addTask(data.title, data.flag);
      setTasks(prev => [...prev, newTask]);
      setOpenModal(false);
      toast.success("Tarefa adicionada com sucesso!");
    } catch (error) {
      toast.error(String(error));
    }
  };

  const handleEdit = async (todoId: string, done: boolean) => {
    try {
      const updatedTask = await updateTask(todoId, { done: !done });
      setTasks(prevTasks => prevTasks.map(task => (task.id === todoId ? updatedTask : task)));
      toast.success("Tarefa atualizada com sucesso!");
    } catch (error) {
      toast.error(String(error));
    }
  };

  const handleDelete = async (todoId: string) => {
    try {
      await removeTask(todoId);
      setTasks(tasks.filter(task => task.id !== todoId));
      toast.success("Tarefa removida com sucesso!");
    } catch (error) {
      toast.error(String(error));
    }
  };

  function handleOpenEdit(id: string) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    setEditingTask(task);
    setOpenModal(true);
  }

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div>
      <Header />
      <main className="mx-auto w-full max-w-md md:max-w-lg lg:max-w-3xl py-6 align-items-start">
        <div className="px-4 pt-6 pb-4 flex justify-center">
          <ActionButton text="+ Nova tarefa" onClick={() => setOpenModal(true)} className="w-[250px]" />
        </div>

        <Tabs active={activeTab} onChange={setActiveTab} />

        <TaskList tasks={filterAnsSortTasks} onToggle={handleEdit} onDelete={handleDelete} onEdit={handleOpenEdit} />

        {openModal && (
          <Modal
            onClose={() => {
              setOpenModal(false);
              setEditingTask(null);
            }}
            onSuccess={handleSubmit}
            initialData={editingTask}
          />
        )}
      </main>
    </div>
  );
}

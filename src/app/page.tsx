"use client";

import { useState, useEffect, FormEventHandler, useCallback } from "react";
import { addTask, removeTask, updateTask, getAllTasks } from "./services/todo-service";
import { FaTrashCan } from "react-icons/fa6";

export default function Home() {
  const [tasks, setTasks] = useState<ToDo[]>([]);
  const [taskInput, setTaskInput] = useState("");

  const fetchTasks = useCallback(async () => {
    const response = await getAllTasks();
    setTasks(response);
  }, []);

  const handleSubmit: FormEventHandler = async e => {
    e.preventDefault();

    if (!taskInput.trim()) {
      return;
    }

    const newTask = await addTask(taskInput);

    if (newTask) {
      setTasks([...tasks, newTask]);
      setTaskInput("");
    }
  };

  const handleEdit = async (todoId: string, done: boolean) => {
    const updatedTask = await updateTask(todoId, !done);
    if (updatedTask) {
      setTasks(tasks.map(task => (task.id === todoId ? { ...task, done: !task.done } : task)));
    }
  };

  const handleDelete = async (todoId: string) => {
    const result = await removeTask(todoId);
    if (result) {
      setTasks(tasks.filter(task => task.id !== todoId));
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="bg-gray-700 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-128">
        <h1 className="text-2xl text-gray-700 font-bold text-center mb-6">To Do List</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            placeholder="Nova tarefa"
            value={taskInput}
            onChange={e => setTaskInput(e.target.value)}
            className="w-full p-3 pl-6 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-700 text-gray-800"
          />
          <button type="submit" className="w-full p-2 mb-8 bg-gray-700 text-white rounded-lg hover:bg-gray-600">
            Adicionar tarefa
          </button>
        </form>
        {tasks.length > 0 && <h2 className="text-gray-800 font-bold text-center mb-2">Tarefas:</h2>}
        <ul>
          {tasks.map(task => (
            <li
              key={task.id}
              className="border rounded pl-2 py-2 mb-2 bg-gray-300 text-gray-800 flex justify-between items-center"
            >
              <input type="checkbox" checked={task.done} onChange={() => handleEdit(task.id, task.done ?? false)} />
              <span className={task.done ? "line-through" : ""}>{task.task}</span>
              <div className="flex space-x-4 pr-2">
                <button onClick={() => handleDelete(task.id)}>
                  <FaTrashCan className="h-4 w-4 text-gray-800 hover:text-red-600" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

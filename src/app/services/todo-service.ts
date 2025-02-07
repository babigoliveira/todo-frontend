const API_URL = "http://localhost:33333/todo";

const getAllTasks = async (): Promise<ToDo[]> => {
  const response = await fetch(API_URL);
  return response.json();
};

const addTask = async (task: string): Promise<ToDo> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task, completed: false })
  });
  return response.json();
};

const updateTask = async (id: string, completed: boolean) => fetch(`${API_URL}/${id}`, {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ completed })
});

const removeTask = async (id: string) => fetch(`${API_URL}/${id}`, { method: "DELETE" });

export { getAllTasks, addTask, updateTask, removeTask };

const API_URL = "http://localhost:33333/todo";

const getAllTasks = async (): Promise<ToDo[]> => {
  try {
    const response = await fetch(API_URL);
    return response.json();
  } catch {
    throw new Error("Erro ao buscar a lista de tarefas.");
  }
};

const addTask = async (task: string): Promise<ToDo> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task, completed: false })
    });
    return response.json();
  } catch {
    throw new Error("Erro ao adicionar a tarefa.");
  }
};

const updateTask = async (id: string, completed: boolean) => {
  try {
    fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed })
    });
  } catch {
    throw new Error("Erro ao atualizar a tarefa.");
  }
};

const removeTask = async (id: string) => {
  try {
    fetch(`${API_URL}/${id}`, { method: "DELETE" });
  } catch {
    throw new Error("Erro ao remover a tarefa.");
  }
};

export { getAllTasks, addTask, updateTask, removeTask };

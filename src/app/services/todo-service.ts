import { TokenManager } from "./get-token";

const API_URL = "http://localhost:33333/todo";

const tokenManager = new TokenManager();

export type ToDo = {
  id: string;
  task: string;
  done: boolean;
  flag: "high" | "medium" | "low";
};

const getHeaders = async () => ({
  Authorization: `Bearer ${await tokenManager.getToken()}`,
  "Content-Type": "application/json"
});

const makeRequest = async (fn: () => Promise<Response>, errorMsg: string, parseBody = true): Promise<any> => {
  try {
    const response = await fn();

    if (!response.ok) {
      throw new Error(errorMsg);
    }

    if (parseBody) {
      return response.json();
    }
  } catch {
    throw new Error(errorMsg);
  }
};

const getAllTasks = async (): Promise<ToDo[]> => {
  const body = await makeRequest(async () => {
    const headers = await getHeaders();
    const response = await fetch(API_URL, { headers });
    return response;
  }, "Erro ao buscar a lista de tarefas.");

  return body;
};

const addTask = async (task: string, flag: "high" | "medium" | "low"): Promise<ToDo> => {
  const body = await makeRequest(async () => {
    const headers = await getHeaders();
    const response = await fetch(API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({ task, done: false, flag })
    });
    return response;
  }, "Erro ao adicionar a tarefa.");

  return body;
};

const updateTask = async (
  id: string,
  {
    done,
    task,
    flag
  }: {
    done?: boolean;
    task?: string;
    flag?: "high" | "medium" | "low";
  }
): Promise<ToDo> => {
  const body = await makeRequest(async () => {
    const headers = await getHeaders();
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ done , task, flag })
    });
    return response;
  }, "Erro ao atualizar a tarefa.");

  return body;
};

const removeTask = async (id: string): Promise<void> => {
  await makeRequest(
    async () => {
      const headers = await getHeaders();
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers
      });
      return response;
    },
    "Erro ao remover a tarefa.",
    false
  );
};

export { getAllTasks, addTask, updateTask, removeTask };

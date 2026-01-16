const API_URL = "http://localhost:33333/todo";
const BASE_URL = "http://localhost:33333";

export type ToDo = {
  id: string;
  task: string;
  done: boolean;
  flag: "high" | "medium" | "low";
};

type RegisterResponse = {
  user: {
    id: string;
    full_name: string;
    email: string;
    role: string;
  };
};

type MeResponse = {
  id: string;
  full_name: string;
  email: string;
  role: string;
};

const makeRequest = async (fn: () => Promise<Response>, errorMsg: string, parseBody = true) => {
  const response = await fn();

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`${errorMsg} (status ${response.status}) ${text}`);
  }

  if (parseBody) return response.json();
};

const register = async (full_name: string, email: string, password: string): Promise<RegisterResponse> => {
  return await makeRequest(async () => {
    return await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ full_name, email, password })
    });
  }, "Erro ao criar conta.");
};

const login = async (email: string, password: string): Promise<void> => {
  await makeRequest(async () => {
    return fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
  }, "Erro ao fazer o login.");
};

const me = async (): Promise<MeResponse> => {
  return makeRequest(async () => {
    return fetch(`${BASE_URL}/auth/me`, {
      credentials: "include"
    });
  }, "Não autenticado");
};

const getAllTasks = async (): Promise<ToDo[]> => {
  return await makeRequest(async () => {
    return fetch(API_URL, {
      credentials: "include"
    });
  }, "Erro ao buscar a lista de tarefas.");
};

const addTask = async (task: string, flag: "high" | "medium" | "low"): Promise<ToDo> => {
  return makeRequest(async () => {
    return fetch(API_URL, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task, flag })
    });
  }, "Erro ao adicionar a tarefa.");
};

const updateTask = async (
  id: string,
  data: { done?: boolean; task?: string; flag?: "high" | "medium" | "low" }
): Promise<ToDo> => {
  return makeRequest(async () => {
    return fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  }, "Erro ao atualizar a tarefa.");
};

const removeTask = async (id: string): Promise<void> => {
  await makeRequest(
    async () => {
      return fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        credentials: "include"
      });
    },
    "Erro ao remover a tarefa.",
    false
  );
};

const logout = async (): Promise<void> => {
  await makeRequest(
    async () => {
      return fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include"
      });
    },
    "Erro ao fazer logout",
    false
  );
};

export { register, login, me, getAllTasks, addTask, updateTask, removeTask, logout };

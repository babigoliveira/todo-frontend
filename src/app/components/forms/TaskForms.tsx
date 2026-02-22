"use client";

import { useEffect, useState } from "react";
import { Modal } from "../Modal";
import { BaseInput } from "../BaseInput";
import { Select } from "../Select";
import { ToDo } from "@/app/types/todo";

type TaskFormProps = {
  onClose: () => void;
  onSuccess: (data: { title: string; flag: "high" | "medium" | "low" }) => Promise<void>;
  initialData?: ToDo | null;
  loading: boolean;
};

export function TaskForm({ onClose, onSuccess, initialData, loading }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [flag, setFlag] = useState<"" | "high" | "medium" | "low">("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !flag) {
      setError("Preencha os campos obrigatórios");
      return;
    }

    await onSuccess({
      title,
      flag
    });
  };

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.task);
      setFlag(initialData.flag);
    }
  }, [initialData]);

  return (
    <Modal
      title={initialData ? "Editar tarefa" : "Nova tarefa"}
      onClose={onClose}
      onSubmit={handleSubmit}
      loading={loading}
      submitText={initialData ? "Atualizar" : "Salvar"}
    >
      <BaseInput type="text" placeholder="Título da tarefa" value={title} onChange={e => setTitle(e.target.value)} />

      <Select value={flag} onChange={e => setFlag(e.target.value as "" | "high" | "medium" | "low")}>
        <option value="">Prioridade</option>
        <option value="high">Alta</option>
        <option value="medium">Média</option>
        <option value="low">Baixa</option>
      </Select>

      {error && <p className="text-sm text-red-600 text-center">{error}</p>}
    </Modal>
  );
}

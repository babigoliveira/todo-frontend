"use client";

import { RxCross2 } from "react-icons/rx";
import { Card } from "./Card";
import { BaseInput } from "./BaseInput";
import { ActionButton } from "./ActionButton";
import { useEffect, useState } from "react";
import { Background } from "./Background";
import { Select } from "./Select";

type ModalProps = {
  onClose: () => void;
  onSuccess: (data: { title: string; flag: "high" | "medium" | "low" }) => void;
  initialData?: ToDo | null;
};

export function Modal({ onClose, onSuccess, initialData }: ModalProps) {
  const [title, setTitle] = useState("");
  const [flag, setFlag] = useState<"" | "high" | "medium" | "low">("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title || !flag) {
      setError("Preencha os campos obrigatórios");
      return;
    }

    setError("");
    onSuccess({ title, flag });
  }

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.task);
      setFlag(initialData.flag);
    } else {
      setTitle("");
      setFlag("");
    }
  }, [initialData]);
  return (
    <Background className="fixed inset-0 bg-black/40 backdrop-blur-sm">
      <Card>
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl text-gray-500">Nova tarefa</h2>
          <button type="button" aria-label="Fechar modal" onClick={onClose}>
            <RxCross2 size={24} className="text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <BaseInput
            type="text"
            placeholder="Título da tarefa"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <Select value={flag} onChange={e => setFlag(e.target.value as "" | "high" | "medium" | "low")}>
            <option value="">Prioridade</option>
            <option value="high">Alta</option>
            <option value="medium">Média</option>
            <option value="low">Baixa</option>
          </Select>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div className="flex gap-4 md:flex-row md:justify-end">
            <ActionButton
              type="button"
              text="Voltar"
              loadingText="Voltando..."
              variant="secondary"
              className="md:w-[150px]"
              onClick={onClose}
            />
            <ActionButton
              type="submit"
              text={initialData ? "Atualizar" : "Salvar"}
              loadingText="Salvando..."
              loading={loading}
              className="md:w-[150px]"
            />
          </div>
        </form>
      </Card>
    </Background>
  );
}

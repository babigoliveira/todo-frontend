import { useState } from "react";
import { Modal } from "../Modal";
import { BaseInput } from "../BaseInput";

type ChangeNameFormProps = {
  onClose: () => void;
  onSuccess: (name: string) => Promise<void>;
  loading: boolean;
};

export function ChangeNameForm({ onClose, loading, onSuccess }: ChangeNameFormProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      setError("Informe um nome válido");
      return;
    }

    setError("");
    await onSuccess(name);
  }

  return (
    <Modal
      title="Alterar nome"
      onClose={onClose}
      onSubmit={handleSubmit}
      loading={loading}
      submitText="Atualizar"
      loadingText="Atualizando..."
    >
      <BaseInput type="text" placeholder="Novo nome" value={name} onChange={e => setName(e.target.value)} />

      {error && <p className="text-sm text-red-600 text-center">{error}</p>}
    </Modal>
  );
}

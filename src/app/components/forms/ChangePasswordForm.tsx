import { useState } from "react";
import { Modal } from "../Modal";
import { BaseInput } from "../BaseInput";

type ChangePasswordFormProps = {
  onClose: () => void;
  onSuccess: (data: { currentPassword: string; newPassword: string }) => Promise<void>;
  loading: boolean;
};

export function ChangePasswordForm({ onClose, onSuccess, loading }: ChangePasswordFormProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword || !newPassword) {
      setError("Preencha todos os campos");
      return;
    }

    if (newPassword.length < 6) {
      setError("Nova senha deve ter no mínimo 6 caracteres");
      return;
    }

    setError("");

    await onSuccess({
      currentPassword: currentPassword,
      newPassword: newPassword
    });
  };

  return (
    <Modal
      title="Alterar senha"
      onClose={onClose}
      onSubmit={handleSubmit}
      loading={loading}
      submitText="Atualizar"
      loadingText="Atualizando..."
    >
      <BaseInput
        type="password"
        placeholder="Senha atual"
        value={currentPassword}
        onChange={e => setCurrentPassword(e.target.value)}
        autoComplete="current-password"
      />

      <BaseInput
        type="password"
        placeholder="Nova senha"
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
        autoComplete="new-password"
      />

      {error && <p className="text-sm text-red-600 text-center">{error}</p>}
    </Modal>
  );
}

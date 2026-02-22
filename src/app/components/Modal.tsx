import { RxCross2 } from "react-icons/rx";
import { Card } from "./Card";
import { ActionButton } from "./ActionButton";
import { Background } from "./Background";

type ModalProps = {
  title: string;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  loading?: boolean;
  submitText?: string;
  loadingText?: string;
  children: React.ReactNode;
};

export function Modal({
  title,
  onClose,
  onSubmit,
  loading,
  submitText = "Salvar",
  loadingText = "Salvando...",
  children
}: ModalProps) {
  return (
    <Background className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <Card>
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl text-gray-500">{title}</h2>

          <button type="button" aria-label="Fechar modal" onClick={onClose}>
            <RxCross2 size={24} className="text-gray-400" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {children}

          <div className="flex gap-4 md:flex-row md:justify-end">
            <ActionButton type="button" text="Voltar" color="secondary" className="md:w-[150px]" onClick={onClose} />

            <ActionButton
              type="submit"
              text={submitText}
              loadingText={loadingText}
              loading={loading}
              className="md:w-[150px]"
            />
          </div>
        </form>
      </Card>
    </Background>
  );
}

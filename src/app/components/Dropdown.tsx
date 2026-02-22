import { FaLock } from "react-icons/fa";
import { TextButton } from "./TextButton";
import { RxAvatar } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";

type DropdownProps = {
  onChangeName: () => void;
  onChangePassword: () => void;
  onLogout: () => void;
};

export function Dropdown({ onChangeName, onChangePassword, onLogout }: DropdownProps) {
  return (
    <div className="absolute right-0 mt-3 w-56 rounded-lg bg-white shadow-lg border border-gray-200 overflow-hidden">
      <TextButton
        color="primary"
        className="w-full px-4 py-2 text-left text-md flex items-center gap-2"
        onClick={onChangeName}
      >
        <RxAvatar />
        Alterar nome
      </TextButton>

      <TextButton
        color="secondary"
        className="w-full px-4 py-2 text-left text-md flex items-center gap-2"
        onClick={onChangePassword}
      >
        <FaLock />
        Alterar senha
      </TextButton>

      <TextButton
        color="danger"
        className="w-full px-4 py-2 text-left text-lg flex items-center gap-2"
        onClick={onLogout}
      >
        <FiLogOut />
        Sair
      </TextButton>
    </div>
  );
}

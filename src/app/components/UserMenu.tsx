import { useState, useRef, useEffect } from "react";
import { Dropdown } from "./Dropdown";
import { useRouter } from "next/navigation";
import { logout } from "../services/auth.service";
import { ChangeNameForm } from "./forms/ChangeNameForm";
import { ChangePasswordForm } from "./forms/ChangePasswordForm";
import { updateName, updatePassword } from "../services/user.service";
import { toast } from "react-toastify";

type UserMenuProps = {
  userName?: string;
  onUserUpdated?: (userName: string) => void;
};

function getInitials(name?: string) {
  const safe = (name ?? "").trim();
  if (!safe) return "?";

  const parts = safe.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";

  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts.at(-1)?.[0] ?? "") : "";

  return (first + last).toUpperCase();
}

export function UserMenu({ userName, onUserUpdated }: UserMenuProps) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openNameModal, setOpenNameModal] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const initials = getInitials(userName);

  const handleNameUpdate = async (full_name: string) => {
    setLoading(true);
    try {
      const updatedUser = await updateName(full_name);
      toast.success("Nome atualizado!");
      setOpenNameModal(false);
      onUserUpdated?.(updatedUser.full_name);
    } catch (e: any) {
      toast.error(e.message || "Erro ao atualizar nome");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (data: { currentPassword: string; newPassword: string }) => {
    setLoading(true);
    try {
      await updatePassword(data.currentPassword, data.newPassword);
      toast.success("Senha atualizada com sucesso!");
      setOpenPasswordModal(false);
    } catch (e: any) {
      toast.error(e.message || "Erro ao atualizar senha");
    } finally {
      setLoading(false);
    }
  };

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpenDropdown(prev => !prev)} className="flex items-center gap-3 focus:outline-none">
        <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-600 text-sm font-semibold text-white">
          {initials}
        </div>

        <span className="hidden sm:block text-lg font-medium text-gray-600">{userName}</span>
      </button>

      {openDropdown && (
        <Dropdown
          onChangeName={() => setOpenNameModal(true)}
          onChangePassword={() => setOpenPasswordModal(true)}
          onLogout={handleLogout}
        />
      )}

      {openNameModal && (
        <ChangeNameForm onClose={() => setOpenNameModal(false)} onSuccess={handleNameUpdate} loading={loading} />
      )}

      {openPasswordModal && (
        <ChangePasswordForm
          onClose={() => setOpenPasswordModal(false)}
          onSuccess={handlePasswordUpdate}
          loading={loading}
        />
      )}
    </div>
  );
}

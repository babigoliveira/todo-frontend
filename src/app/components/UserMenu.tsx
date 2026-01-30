import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Dropdown } from "./Dropdown";

type UserMenuProps = {
  userName?: string;
  userAvatarUrl?: string | null;
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

export function UserMenu({ userName, userAvatarUrl }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const initials = getInitials(userName);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(prev => !prev)} className="flex items-center gap-3 focus:outline-none">
        {userAvatarUrl ? (
          <Image
            src={userAvatarUrl}
            alt={userName}
            width={48}
            height={48}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-600 text-sm font-semibold text-white">
            {initials}
          </div>
        )}

        <span className="hidden sm:block text-lg font-medium text-gray-600">{userName}</span>
      </button>

      {open && <Dropdown />}
    </div>
  );
}

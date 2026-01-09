import Image from "next/image";

type HeaderProps = {
  userName?: string;
  userAvatarUrl?: string | null;
};

function getInitials(name: string) {
  const parts = name.trim().split(" ").filter(Boolean);

  if (parts.length === 1) return parts[0][0].toUpperCase();

  return `${parts[0][0]}${parts.at(-1)?.[0]}`.toUpperCase();
}

export function Header({ userName = "Jonh Smith", userAvatarUrl }: HeaderProps) {
  const initials = getInitials(userName);

  return (
    <header className="w-full border-b border-gray-200 bg-white justify-between px-4">
      <div className="flex h-16 items-center justify-between">
        <Image
          src="/images/horizontal-logo.svg"
          alt="PlanList"
          width={140}
          height={32}
          priority
          className="h-10 w-auto sm:h-12"
        />

        <div className="flex items-center gap-3">
          <span className="hidden text-lg font-medium text-gray-700 sm:block">{userName}</span>
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
        </div>
      </div>
    </header>
  );
}

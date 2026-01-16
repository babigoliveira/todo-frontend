import Image from "next/image";
import { UserMenu } from "./UserMenu";

type HeaderProps = {
  userName: string;
};

export function Header({ userName }: HeaderProps) {
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
        <UserMenu userName={userName} />
      </div>
    </header>
  );
}

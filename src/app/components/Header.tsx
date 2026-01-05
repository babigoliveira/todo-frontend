import Image from "next/image";

export function Header() {
  return (
    <header className="flex justify-center items-center">
      <div className="w-[200px] sm:w-[280px] lg:w-[300px]">
        <Image
          src="/images/logo.svg"
          alt="PlanList"
          width={300}
          height={300}
          className="w-full h-auto"
        />
      </div>
    </header>
  );
}

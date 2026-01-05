type BackgroundProps = {
  children: React.ReactNode;
  color?: "emerald" | "white";
};

export function Background({ children, color = "emerald" }: BackgroundProps) {
  const bgClass = color === "emerald" ? "bg-emerald-500" : "bg-white";

  return <div className={`min-h-screen flex items-center justify-center ${bgClass} text-gray-600`}>{children}</div>;
}

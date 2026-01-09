type Flag = "high" | "medium" | "low";

export function Flag({ flag }: { flag: Flag }) {
  const map = {
    high: { label: "Alta", className: "bg-red-700" },
    medium: { label: "Média", className: "bg-orange-500" },
    low: { label: "Baixa", className: "bg-yellow-500" }
  };

  const { label, className } = map[flag];

  return <span className={`rounded px-2 py-0.5 text-xs text-white text-center font-medium w-12 ${className}`}>{label}</span>;
}

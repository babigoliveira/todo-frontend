type TabKey = "all" | "done" | "pending";

type TabsProps = {
  active: TabKey;
  onChange: (tab: TabKey) => void;
};

export function Tabs({ active, onChange }: TabsProps) {
  const tabs: { key: TabKey; label: string }[] = [
    { key: "all", label: "Todas" },
    { key: "done", label: "Concluídas" },
    { key: "pending", label: "Pendentes" }
  ];

  return (
    <div className="flex gap-6 px-4 mt-6 border-gray-300">
      {tabs.map(tab => {
        const isActive = active === tab.key;

        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={`
              pb-2 text-sm font-medium transition
              ${isActive ? "text-gray-800 border-b-2 border-gray-800" : "text-gray-400 hover:text-gray-600"}
            `}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

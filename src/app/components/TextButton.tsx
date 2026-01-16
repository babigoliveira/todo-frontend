type TextButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button";
  color?: "primary" | "secondary" | "danger";
};

export function TextButton({
  children,
  onClick,
  className = "",
  type = "button",
  color = "secondary"
}: TextButtonProps) {
  const variantColor = {
    primary: "text-emerald-600",
    secondary: "text-sky-600",
    danger: "text-red-600"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${variantColor[color]} hover:underline ${className}`}
    >
      {children}
    </button>
  );
}

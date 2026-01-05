type TextButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export function TextButton({ children, onClick, className = "", type = "button" }: TextButtonProps) {
  return (
    <button type={type} onClick={onClick} className={`text-sky-600 text-sm hover:underline ${className}`}>
      {children}
    </button>
  );
}

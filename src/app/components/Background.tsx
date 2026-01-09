type BackgroundProps = {
  children: React.ReactNode;
  className?: string;
};

export function Background({ children, className }: BackgroundProps) {
  return <div className={`min-h-screen flex justify-center items-center text-gray-600 ${className}`}>{children}</div>;
}

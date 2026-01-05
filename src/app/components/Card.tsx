type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div className={`w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white rounded-2xl shadow-lg p-8 m-4 ${className}`}>
      {children}
    </div>
  );
}

import React from "react";

type IconInputProps = {
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  className?: string;
};

export function Input({ type, placeholder, value, onChange, icon, rightElement, className = "" }: IconInputProps) {
  return (
    <div className={`relative ${className}`}>
      {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</div>}

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-emerald-500 px-8 py-4 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
      />

      {rightElement && <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightElement}</div>}
    </div>
  );
}

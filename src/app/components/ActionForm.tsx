import React from "react";

export type ActionFormProps = {
  type?: "button" | "submit" | "reset";
  text: string;
  loadingText?: string;
  loading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "secondary" | "danger";
};

export function ActionForm({
  text,
  loadingText,
  loading = false,
  type = "button",
  onClick,
  disabled = false,
  className,
  variant = "primary"
}: ActionFormProps) {
  const buttonText = loading && loadingText ? loadingText : text;

  const baseClasses =
    "w-full mt-2 rounded-lg py-2.5 font-medium transition disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-700",
    secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50",
    danger: "bg-red-600 text-white hover:bg-red-700"
  };

  return (
    <button
      type={type}
      disabled={loading || disabled}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {buttonText}
    </button>
  );
}

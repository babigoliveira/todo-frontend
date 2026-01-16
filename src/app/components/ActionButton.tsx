import React from "react";

export type ActionButtonProps = {
  type?: "button" | "submit";
  text: string;
  loadingText?: string;
  loading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  color?: "primary" | "secondary" | "danger";
};

export function ActionButton({
  text,
  loadingText,
  loading = false,
  type = "button",
  onClick,
  disabled = false,
  className,
  color = "primary"
}: ActionButtonProps) {
  const buttonText = loading && loadingText ? loadingText : text;

  const baseClasses = "mt-2 rounded-lg py-2.5 font-medium transition disabled:opacity-50 disabled:cursor-not-allowed";

  const variantColor = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-700",
    secondary: "bg-gray-500 text-white border hover:bg-gray-600",
    danger: "bg-red-600 text-white hover:bg-red-700"
  };

  return (
    <button
      type={type}
      disabled={loading || disabled}
      onClick={onClick}
      className={`${baseClasses} ${variantColor[color]} ${className}`}
    >
      {buttonText}
    </button>
  );
}

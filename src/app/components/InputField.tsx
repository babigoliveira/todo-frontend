import React from "react";
import { BaseInput } from "./BaseInput";

type InputFieldProps = {
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  className?: string;
  autoComplete?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function InputField({ icon, rightElement, className, ...props }: InputFieldProps) {
  return (
    <div className="relative">
      {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{icon}</div>}

      <BaseInput
        {...props}
        className={`
          ${icon ? "pl-10" : ""}
          ${rightElement ? "pr-10" : ""}
          ${className ?? ""}
        `}
      />

      {rightElement && <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightElement}</div>}
    </div>
  );
}

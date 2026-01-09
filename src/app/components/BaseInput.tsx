import { InputHTMLAttributes } from "react";
import { baseFieldStyles } from "./baseFieldStyles";

type BaseInputProps = InputHTMLAttributes<HTMLInputElement>;

export function BaseInput({ className, ...props }: BaseInputProps) {
  return <input {...props} className={`${baseFieldStyles} ${className ?? ""}`} />;
}

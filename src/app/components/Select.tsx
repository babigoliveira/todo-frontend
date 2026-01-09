import { SelectHTMLAttributes } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { baseFieldStyles } from "./baseFieldStyles";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        {...props}
        className={`
          ${baseFieldStyles} text-gray-500
        `}
      >
        {children}
      </select>
    </div>
  );
}

import { FormFieldProps } from "@/types/form";
import React from "react";

interface InputFieldProps extends FormFieldProps {
  type?: "text" | "email" | "password" | "number" | "tel" | "date";
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  errors?: string;
  inputStyle?: string;
  className?: string;
}

export default function InputField({
  label,
  name,
  onChange,
  value,
  className,
  errors,
  inputStyle,
  placeholder,
  required,
  type,
}: InputFieldProps) {
  return (
    <div className={`mb-4 ${className}`}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}&nbsp;
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        autoComplete="off"
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" ${inputStyle}`}
      />
      {errors && <p className="text-red-500 text-xs mt-1">{errors}</p>}
    </div>
  );
}

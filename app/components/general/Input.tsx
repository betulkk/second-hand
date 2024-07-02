"use client";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  placeholder: string;
  disabled?: boolean;
  type: string;
  required?: boolean;
  pattern?: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  title?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  placeholder,
  disabled,
  type,
  pattern,
  required,
  title,
  register,
  errors,
}) => {
  return (
    <div>
      <input
        className={`w-full h-12 p-3 rounded-md outline-none my-2${errors[id] ? "border-rose-500" : "border-neutral-300"}`}
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        type={type}
        pattern={pattern}
        title={title}
        {...register(id, { required })}
      />
    </div>
  );
};

export default Input;

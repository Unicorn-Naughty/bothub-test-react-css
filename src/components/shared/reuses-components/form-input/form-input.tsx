import React from "react";
import { Input } from "../input/input";
import { useFormContext } from "react-hook-form";
import styles from "./index.module.css";

interface formInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  name: string;
  label?: string;
  required?: boolean;
  placeholder: string;
}

export const FormInput: React.FC<formInputProps> = ({
  className,
  name,
  label,
  required,
  placeholder,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorText = errors[name]?.message as string;

  return (
    <div className={className}>
      {label && (
        <p className={styles.label}>
          {label}
          {required && "*"}
        </p>
      )}
      <Input
        {...props}
        {...register(name)}
        className={styles.input}
        placeholder={placeholder}
      />
      {errorText && <span className={styles.errorText}>{errorText}</span>}
    </div>
  );
};
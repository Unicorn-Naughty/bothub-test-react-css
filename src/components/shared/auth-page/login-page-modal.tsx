import { cn } from "@/lib/utils";
import React from "react";
import { LoginPageFormSignIN } from "./login-page-forms/login-page-form-signIn";
import styles from "./index.module.css";

interface Props {
  className?: string;
}

export const LoginPageModal: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn(styles.modal, className)}>
      <LoginPageFormSignIN />
    </div>
  );
};
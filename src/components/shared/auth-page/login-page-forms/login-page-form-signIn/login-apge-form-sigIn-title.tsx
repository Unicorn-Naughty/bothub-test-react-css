import React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./index.module.css";

interface Props {
  className?: string;
}

export const LoginApgeFormSigInTitle: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn(styles.container, className)}>
      <h1 className={styles.title}>Авторизация</h1>
      <button type="button" className={styles.closeButton}>
        <X className={styles.icon} />
      </button>
    </div>
  );
};

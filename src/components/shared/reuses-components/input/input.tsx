import { cn } from "@/lib/utils";
import React from "react";
import styles from "./index.module.css";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  messagesPage?: boolean;
  placeholder: string;
  handlePostMessageToChat?: () => void;
}

export const Input: React.FC<Props> = ({
  handlePostMessageToChat,
  messagesPage,
  placeholder,
  className,
  ...props
}) => {
  return (
    <label className={styles.label}>
      <input
        {...props}
        className={cn(styles.input, className)}
        placeholder={placeholder}
      />
      {messagesPage && (
        <button
          onClick={handlePostMessageToChat}
          className={styles.button}
        >
          <img
            alt="send-icon"
            width={38}
            height={38}
            src={"/messages/button.svg"}
          />
        </button>
      )}
    </label>
  );
};
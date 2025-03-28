import { copyMessageText } from "@/lib/copy-message-text";
import { getMessageTime } from "@/lib/get-message-time";
import { cn } from "@/lib/utils";
import { MessageEntity } from "@/types/MessageEntity";
import React from "react";
import styles from "./index.module.css";

interface Props {
  className?: string;
  message: MessageEntity;
}

export const ContentClientMessage: React.FC<Props> = ({
  className,
  message,
}) => {
  const handleCopy = () => {
    if (message.content) copyMessageText(message.content);
  };

  const time = getMessageTime(message.created_at);

  return (
    <li className={cn(styles.listItem, className)}>
      <button onClick={handleCopy} className={styles.copyButton}>
        <img
          alt="copy-icon"
          src={"/messages/copy.svg"}
          width={18}
          height={18}
        />
      </button>
      <blockquote className={styles.messageBlock}>
        <p className={styles.messageText}>{message.content}</p>
        <time className={styles.messageTime}>{time}</time>
      </blockquote>
      <figure className={styles.userFigure}>
        <img
          alt="use-img"
          src={"/messages/user.svg"}
          width={40}
          height={40}
        />
      </figure>
    </li>
  );
};

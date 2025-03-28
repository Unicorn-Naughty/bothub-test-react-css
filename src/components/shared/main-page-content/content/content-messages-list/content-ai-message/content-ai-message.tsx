import { copyMessageText } from "@/lib/copy-message-text";
import { getMessageTime } from "@/lib/get-message-time";
import { cn } from "@/lib/utils";
import { MessageEntity } from "@/types/MessageEntity";
import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import styles from "./index.module.css";

interface Props {
  className?: string;
  message: MessageEntity;
}

export const ContentAiMessage: React.FC<Props> = ({ className, message }) => {
  const [accumulatedText, setAccumulatedText] = useState("");

  useEffect(() => {
    if (Array.isArray(message.content)) {
      const completeText = message.content.join("");
      setAccumulatedText(completeText);
    } else {
      setAccumulatedText(message.content || "");
    }
  }, [message.content]);

  const handleCopy = () => {
    if (accumulatedText) copyMessageText(accumulatedText);
  };

  const time = getMessageTime(message.created_at);
  const label = message.model?.parent?.label
    ? message.model?.parent?.label
    : "";
  const sanitizedText = DOMPurify.sanitize(accumulatedText);

  return (
    <li className={cn(styles.listItem, className)}>
      <img
        src={"/messages/gptIcon.svg"}
        alt="ai-icon"
        width={40}
        height={40}
        className={styles.aiIcon}
      />
      <div className={styles.messageContainer}>
        <figure className={styles.figure}>
          <figcaption className={styles.figcaption}>
            {label ? label : "label_name"}
          </figcaption>
          <span className={styles.modelId}>
            {message.model_id ? message.model_id : "model_id"}
          </span>
        </figure>
        <blockquote>
          <p
            dangerouslySetInnerHTML={{ __html: sanitizedText }}
            className={styles.messageText}
          ></p>
          <div className={styles.messageFooter}>
            <div className={styles.footerLeft}>
              <span className={styles.capsText}>
                {message.tokens ? `-${message.tokens} CAPS` : ""}
              </span>
              <button onClick={handleCopy} className={styles.copyButton}>
                <img
                  alt="copy-icon"
                  src={"/messages/copy.svg"}
                  width={18}
                  height={18}
                />
              </button>
            </div>
            <time className={styles.time}>{time}</time>
          </div>
        </blockquote>
      </div>
    </li>
  );
};

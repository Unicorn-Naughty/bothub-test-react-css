import React, { useEffect, useRef } from "react";
import { ContentClientMessage } from "./content-client-message/content-client-message";
import { ContentAiMessage } from "./content-ai-message/content-ai-message";
import { cn } from "@/lib/utils";
import { oneChatMessagesStoreZustand } from "@/src/store/one-chat-messages-store";
import ClipLoader from "react-spinners/ClipLoader";
import styles from "./index.module.css";

interface Props {
  className?: string;
}

export const ContentMessagesList: React.FC<Props> = ({ className }) => {
  const {
    chatMessagePage: { data: messages },
    loading,
  } = oneChatMessagesStoreZustand((state) => state);
  
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <ul className={cn(styles.messagesList, className)}>
      {loading ? (
        <div className={styles.loadingContainer}>
          <ClipLoader
            color={"#1C64F2"}
            size={150}
            speedMultiplier={0.5}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <p className={styles.loadingText}>Ожидаем пока вы начнете чат...</p>
        </div>
      ) : messages.length <= 0 ? (
        <p className={styles.noMessagesText}>
          У вас пока что нет сообщений в этом чате. Давайте начнем общение!
        </p>
      ) : (
        <>
          {messages.map((message, i) =>
            message.role === "user" ? (
              <ContentClientMessage
                message={message}
                key={i}
                className={styles.clientMessage}
              />
            ) : (
              <ContentAiMessage
                message={message}
                key={i}
                className={styles.aiMessage}
              />
            )
          )}
          <div ref={messagesEndRef} />
        </>
      )}
    </ul>
  );
};
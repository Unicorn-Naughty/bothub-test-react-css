import { chatsStoreZustand } from "@/src/store/chats-store";
import { oneChatMessagesStoreZustand } from "@/src/store/one-chat-messages-store";
import { userStoreZustand } from "@/src/store/user-store";
import { cn } from "@/lib/utils";
import { ChatEntity } from "@/types/ChatEntity";
import { MessageSquare, Trash } from "lucide-react";
import styles from "./index.module.css";
import React from "react";
interface Props {
  className?: string;
  chat: ChatEntity;
}

export const SidebarChat: React.FC<Props> = ({ className, chat }) => {
  const { deleteChat, selectChat, selectedChat } = chatsStoreZustand(
    (state) => state
  );

  const token = userStoreZustand((state) => state.user.token);
  const fetchMessage = oneChatMessagesStoreZustand(
    (state) => state.fetchMessage
  );

  const handleDeleteChat = (id: string, token: string) => {
    deleteChat(token, id);
  };

  const handleFetchMessages = (id: string) => {
    selectChat(id);
    fetchMessage(token, id);
  };

  return (
    <li className={cn(styles.chatItem, className)}>
      <div
        onClick={() => handleFetchMessages(chat.id)}
        className={styles.chatContent}
      >
        <MessageSquare
          className={cn(
            styles.messageIcon,
            selectedChat === chat.id && styles.messageIconActive
          )}
        />

        <blockquote>
          <p
            className={cn(
              styles.chatName,
              selectedChat === chat.id && styles.chatNameActive
            )}
          >
            {chat.name}
          </p>
        </blockquote>
      </div>

      <button onClick={() => handleDeleteChat(chat.id, token)}>
        <Trash
          className={cn(
            styles.trashIcon,
            selectedChat === chat.id && styles.trashIconActive
          )}
        />
      </button>
    </li>
  );
};

import { cn } from "@/lib/utils";
import React from "react";
import { SidebarChat } from "./sidebar-chat/sidebar-chat";
import { useChats } from "@/src/hooks/use-chats";
import { ChatSkeleton } from "../../../skeletons/chat-skeleton";
import styles from "./index.module.css";

interface Props {
  className?: string;
}

export const SidebarChatsList: React.FC<Props> = ({ className }) => {
  const { loading, chats } = useChats();
  
  return (
    <ul className={cn(styles.list, className)}>
      {loading ? (
        Array.from({ length: 3 }).map((_, i) => <ChatSkeleton key={i} />)
      ) : chats.length <= 0 ? (
        <p className={styles.noChatsMessage}>У вас пока нет чатов</p>
      ) : (
        chats.map((chat, i) => <SidebarChat chat={chat} key={i} />)
      )}
    </ul>
  );
};
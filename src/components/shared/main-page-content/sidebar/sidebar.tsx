import React from "react";
import { SidebarContainer } from "../../reuses-components/sidebar-container/sidebar-container";
import { SidebarHeader } from "./sidebar-header/sidebar-header";
import { SidebarChatsList } from "./sidebar-chat-list/sidebar-chats-list";
import { SidebarUser } from "./sidebar-user/sidebar-user";
import styles from "./index.module.css";

interface Props {
  className?: string;
}

export const Sidebar: React.FC<Props> = () => {
  return (
    <SidebarContainer>
      <SidebarHeader className={styles.header} />
      <SidebarChatsList className={styles.chatsList} />
      <SidebarUser className={styles.user} />
    </SidebarContainer>
  );
};
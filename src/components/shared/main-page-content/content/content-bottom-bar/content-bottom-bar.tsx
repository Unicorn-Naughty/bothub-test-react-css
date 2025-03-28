import React from "react";
import { ContentDropdownComponent } from "./content-dropdown-component/content-dropdown-component";
import { Input } from "../../../reuses-components/input/input";
import { cn } from "@/lib/utils";
import { oneChatMessagesStoreZustand } from "@/src/store/one-chat-messages-store";
import { userStoreZustand } from "@/src/store/user-store";
import { chatsStoreZustand } from "@/src/store/chats-store";
import styles from "./index.module.css";

interface Props {
  className?: string;
}

export const ContentBottomBar: React.FC<Props> = ({ className }) => {
  const token = userStoreZustand((state) => state.user.token);
  const { createChat } = chatsStoreZustand((state) => state);
  const { fetchMessage, postMessageToChat, getMessageFromChatSSE } =
    oneChatMessagesStoreZustand((state) => state);

  const { selectedChat, selectChat } = chatsStoreZustand((state) => state);
  const [inputValue, setInputValue] = React.useState("");

  const handlePostMessageToChat = async () => {
    if (inputValue.trim() !== "") {
      if (selectedChat) {
        const body = {
          chatId: selectedChat,
          message: inputValue,
        };
        setInputValue("");
        postMessageToChat(token, body);
        getMessageFromChatSSE(token, selectedChat);
      } else {
        const newChat = await createChat(token, { name: "Новый чат" });
        selectChat(newChat.id);
        postMessageToChat(token, {
          chatId: newChat.id,
          message: inputValue,
        });
        fetchMessage(token, newChat.id);
        getMessageFromChatSSE(token, newChat.id);
        setInputValue("");
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handlePostMessageToChat();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={cn("", className)}>
      <ContentDropdownComponent />
      <Input
        handlePostMessageToChat={handlePostMessageToChat}
        className={cn(styles.input)}
        placeholder="Спроси о чем-нибудь..."
        messagesPage={true}
        value={inputValue}
        onChange={(e) => handleInputChange(e)}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};
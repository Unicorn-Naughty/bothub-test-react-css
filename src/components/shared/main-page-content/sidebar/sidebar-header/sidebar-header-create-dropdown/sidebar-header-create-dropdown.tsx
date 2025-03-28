import React from "react";
import { Input } from "../../../../reuses-components/input/input";
import { chatsStoreZustand } from "@/src/store/chats-store";
import { userStoreZustand } from "@/src/store/user-store";
import styles from "./index.module.css";
import { cn } from "@/lib/utils";
import { useClickAway } from "react-use";

interface Props {
  className?: string;
}

export const SidebarHeaderCreateDropdown: React.FC<Props> = () => {
  const token = userStoreZustand((state) => state.user.token);
  const createChat = chatsStoreZustand((state) => state.createChat);

  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  const [textValue, setTextValue] = React.useState("");

  const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };

  const handleCreateChat = () => {
    if (textValue.trim() !== "") {
      createChat(token, { name: textValue });
      setTextValue("");
      setOpen(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCreateChat();
    }
  };

  useClickAway(ref, () => {
    if (open) {
      setOpen(false);
    }
  });

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div ref={ref} className={styles.mainDivWrsrcer}>
      <div>
        <button onClick={toggleOpen}>
          <img
            width={38}
            height={38}
            alt="add-chat-icon"
            src={"/sidebar/side-bar-buttons.svg"}
          />
        </button>
      </div>
      <div
        className={cn(
          styles.dropdownContent,
          open && styles.dropdownContentOpen
        )}
      >
        <Input
          value={textValue}
          onKeyDown={handleKeyPress}
          onChange={(e) => handleChangeInputValue(e)}
          className={styles.input}
          placeholder="Введите название чата"
        />
        <button
          onClick={handleCreateChat}
          type="submit"
          className={styles.createButton}
        >
          Создать
        </button>
      </div>
    </div>
  );
};

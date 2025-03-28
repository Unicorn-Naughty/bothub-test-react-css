import { cn } from "@/lib/utils";
import React from "react";
import styles from "./index.module.css";
import { useClickAway } from "react-use";

interface Props {
  className?: string;
}

export const DropdownLanguage: React.FC<Props> = () => {
  const ref = React.useRef(null);
  const [testItem, setTestItem] = React.useState({
    name: "ru",
  });
  const [open, setOpen] = React.useState(false);
  const testItems = [
    {
      name: "ru",
    },
    {
      name: "en",
    },
  ];
  const handleTestItemClick = (item: { name: string }) => {
    setTestItem(item);
    setOpen(false);
  };
  useClickAway(ref, () => {
    if (open) {
      setOpen(false);
    }
  });
  const toggleOpen = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <div ref={ref} className={styles.mainDivWrapper}>
      <div>
        <button className={styles.triggerButton} onClick={toggleOpen}>
          <img
            src={"/sidebar/lang.svg"}
            alt="lang-icon"
            width={18}
            height={18}
          />
          <span>{testItem.name}</span>
          <img
            className={cn(
              styles.chevronIcon,
              open ? styles.chevronIconOpen : styles.chevronIconClosed
            )}
            src={"/messages/arrow-down.svg"}
            alt="chevron-down"
            width={16}
            height={16}
          />
        </button>
      </div>
      <div
        className={cn(
          styles.dropdownContent,
          open && styles.dropdownContentOpen
        )}
      >
        {testItems.map((item, i) => (
          <div
            onClick={() => handleTestItemClick(item)}
            className={cn(
              styles.dropdownItem,
              testItem.name === item.name && styles.dropdownItemActive
            )}
            key={i}
          >
            <span className={styles.itemText}>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

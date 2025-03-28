import { sideBarStateStore } from "@/src/store/sidebar-state-store";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import React from "react";
import styles from "./index.module.css";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  const { changeStateOpen } = sideBarStateStore((state) => state);
  return (
    <header className={cn(styles.header, className)}>
      <button onClick={changeStateOpen}>
        <Menu />
      </button>
    </header>
  );
};
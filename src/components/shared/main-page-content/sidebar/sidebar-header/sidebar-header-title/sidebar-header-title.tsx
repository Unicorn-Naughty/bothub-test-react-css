import { cn } from "@/lib/utils";
import React from "react";
import { DropdownLanguage } from "../sidebar-dropdown-language/dropdown-language";
import styles from "./index.module.css";

interface Props {
  className?: string;
}

export const SidebarHeaderTitle: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn(styles.header, className)}>
      <div>
        <img src={"/sidebar/logo.png"} alt="logo" width={104} height={30} />
      </div>
      <DropdownLanguage />
    </header>
  );
};
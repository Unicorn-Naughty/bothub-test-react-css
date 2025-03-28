import React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarHeaderCreateDropdown } from "../sidebar-header-create-dropdown/sidebar-header-create-dropdown";
import styles from "./index.module.css";

interface Props {
  className?: string;
}

export const SidebarHeaderButtons: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn(styles.container, className)}>
      <SidebarHeaderCreateDropdown />
      <button className={styles.searchButton}>
        <Search className={styles.searchIcon} />
      </button>
    </div>
  );
};
import React from "react";
import { SidebarHeaderTitle } from "./sidebar-header-title/sidebar-header-title";
import { SidebarHeaderButtons } from "./sidebar-header-buttons/sidebar-header-buttons";
import styles from "./index.module.css";

interface Props {
  className?: string;
}

export const SidebarHeader: React.FC<Props> = ({ className }) => {
  return (
    <div className={`${className}`}>
      <SidebarHeaderTitle className={styles.title} />
      <SidebarHeaderButtons />
    </div>
  );
};
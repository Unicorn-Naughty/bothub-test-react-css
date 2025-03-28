import React from "react";
import styles from "./index.module.css";

interface Props {
  children: React.ReactNode;
}

export const RootContainer: React.FC<Props> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
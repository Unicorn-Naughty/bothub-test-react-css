import React from "react";
import { cn } from "@/lib/utils";
import styles from "./index.module.css";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const ContentContainer: React.FC<Props> = ({ className, children }) => {
  return <div className={cn(styles.container, className)}>{children}</div>;
};
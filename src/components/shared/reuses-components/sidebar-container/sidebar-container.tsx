import { sideBarStateStore } from "@/src/store/sidebar-state-store";
import { cn } from "@/lib/utils";
import { useClickAway } from "react-use";
import React from "react";
import styles from "./index.module.css";

interface Props {
  children: React.ReactNode;
}

export const SidebarContainer: React.FC<Props> = ({ children }) => {
  const { open, changeStateClose } = sideBarStateStore((state) => state);
  const ref = React.useRef(null);
  const [isMobile, setIsMobile] = React.useState(false);

  useClickAway(ref, () => {
    if (open) {
      changeStateClose();
    }
  });

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 750);
    };

    handleResize(); // Check initial screen size
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div
      initial={{ x: isMobile ? "-100%" : 0 }}
      animate={{ x: open && isMobile ? 0 : isMobile ? "-100%" : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        styles.container,
        isMobile ? (open ? styles.visibleOnMobile : styles.hiddenOnMobile) : ""
      )}
    >
      <aside ref={ref} className={styles.aside}>
        {children}
      </aside>
    </motion.div>
  );
};
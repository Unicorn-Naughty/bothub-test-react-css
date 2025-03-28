import React from "react";
import { cn } from "@/lib/utils";
import { userStoreZustand } from "@/src/store/user-store";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";

interface Props {
  className?: string;
}

export const SidebarUser: React.FC<Props> = ({ className }) => {
  const navigate = useNavigate();
  const user = userStoreZustand((state) => state.user);
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const number = 9012;
  return (
    <div className={cn(styles.container, className)}>
      <figure className={styles.figure}>
        <div className={styles.avatar}>
          <img
            className=""
            src={"/messages/user.svg"}
            alt="user-icon"
            width={40}
            height={40}
          />
        </div>
        <div>
          <figcaption>{user.email}</figcaption>
          <div className={styles.tokenText}>{number.toLocaleString("ru")} tkn</div>
        </div>
      </figure>
      <button onClick={handleLogout}>
        <img
          className=""
          width={18}
          height={18}
          alt="logout-icon"
          src={"/sidebar/logout.svg"}
        />
      </button>
    </div>
  );
};

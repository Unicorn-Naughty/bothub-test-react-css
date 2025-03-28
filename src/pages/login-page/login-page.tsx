import React from "react";
import { useNavigate } from "react-router-dom";
import { LoginPageModal } from "@/src/components/shared/auth-page/login-page-modal";
import styles from "./page.module.css";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const navigate = useNavigate();

  React.useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      navigate("/");
    }
  }, [navigate]);

  return (

      <div className={cn(`${styles.container} ${styles.layoutWrapper}`)}>
        <LoginPageModal />
      </div>
  );
}
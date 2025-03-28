import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
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
    <HelmetProvider>
      <Helmet>
        <title>auth-bothub-test</title>
        <meta name="description" content="auth page" />
      </Helmet>
      <div className={cn(`${styles.container} ${styles.layoutWrapper}`)}>
        <LoginPageModal />
      </div>
    </HelmetProvider>
  );
}
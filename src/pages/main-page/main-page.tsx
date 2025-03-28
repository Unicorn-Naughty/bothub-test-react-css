import { Header } from "@/src/components/shared/header-750-px/header";
import { Content } from "@/src/components/shared/main-page-content/content/content";
import { Sidebar } from "@/src/components/shared/main-page-content/sidebar/sidebar";
import { useAuth } from "../../hooks/use-auth";
import { cn } from "@/lib/utils";
import ClipLoader from "react-spinners/ClipLoader";
import styles from "./index.module.css";
import { RootContainer } from "@/src/components/shared/reuses-components/root-container/root-container";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function MainPage() {
  const isAuthenticated = useAuth();

  if (isAuthenticated === null) {
    return (
      <div className={styles.loaderContainer}>
        <ClipLoader
          color={"#1C64F2"}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>bothub-test</title>
        <meta name="description" content="main page" />
      </Helmet>
      <RootContainer>
        <Header className={styles.headerMargin} />
        <div className={cn(styles.mainContainer)}>
          <Sidebar />
          <Content />
        </div>
      </RootContainer>
    </HelmetProvider>
  );
}
import React from "react";
import { ContentMessagesList } from "./content-messages-list/content-messages-list";
import { ContentBottomBar } from "./content-bottom-bar/content-bottom-bar";
import { ContentContainer } from "../../reuses-components/content-container/content-container";
import styles from "./index.module.css";

interface Props {
  className?: string;
}

export const Content: React.FC<Props> = () => {
  return (
    <ContentContainer className={styles.container}>
      <ContentMessagesList className={styles.messagesList} />
      <ContentBottomBar className={styles.bottomBar} />
    </ContentContainer>
  );
};
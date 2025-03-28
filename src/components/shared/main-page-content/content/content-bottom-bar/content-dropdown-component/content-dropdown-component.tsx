import React from "react";
import { Skeleton } from "@/src/components/ui/skeleton/skeleton";
import { aiModelsStoreZustand } from "@/src/store/ai-models-store";
import { cn } from "@/lib/utils";
import { ModelEntity } from "@/types/ModelEntity";
import styles from "./index.module.css";
import { useClickAway } from "react-use";

interface Props {
  className?: string;
}

export const ContentDropdownComponent: React.FC<Props> = () => {
  const { models, loading, setCurrentModel, currentModel } =
    aiModelsStoreZustand((state) => state);
  const cuttedModels = models.slice(0, 10);
  const ref = React.useRef(null);
  const [open, setOpen] = React.useState(false);

  useClickAway(ref, () => {
    if (open) {
      setOpen(false);
    }
  });

  React.useEffect(() => {
    if (models.length > 0) {
      setCurrentModel(cuttedModels[0]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [models]);

  const handleTestItemClick = (item: ModelEntity) => {
    setCurrentModel(item);
    setOpen(false);
  };

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div ref={ref} className={styles.mainDivWrsrcer}>
      <div>
        <button onClick={toggleOpen} className={styles.triggerButton}>
          <img
            src={"/messages/gptIcon.svg"}
            width={18}
            height={18}
            alt="ai-icon"
          />
          {loading ? (
            <Skeleton className={styles.skeleton} />
          ) : (
            <span>{currentModel.label}</span>
          )}
          <img
            className={cn(
              styles.chevronIcon,
              open ? styles.chevronIconOpen : styles.chevronIconClosed
            )}
            src={"/messages/arrow-down.svg"}
            alt="chevron-down"
            width={16}
            height={16}
          />
        </button>
      </div>
      <div
        className={cn(
          styles.dropdownContent,
          open && styles.dropdownContentOpen
        )}
      >
        {cuttedModels.map((model, i) => (
          <div
            onClick={() => handleTestItemClick(model)}
            className={cn(
              styles.dropdownItem,
              model.label && styles.dropdownItemActive
            )}
            key={i}
          >
            <img
              src={"/messages/gptIcon.svg"}
              width={18}
              height={18}
              alt="ai-icon"
            />
            <span>{model.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
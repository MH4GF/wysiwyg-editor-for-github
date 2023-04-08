import { useMemo, useCallback, useSyncExternalStore, useState } from "react";
import { SELECTORS } from "./constants";

export const useSyncGitHubTabsState = () => {
  const writeTab = useMemo(() => {
    return document.querySelector(SELECTORS.WRITE_TAB);
  }, []);

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      writeTab?.addEventListener("click", onStoreChange);
      return () => writeTab?.removeEventListener("click", onStoreChange);
    },
    [writeTab]
  );

  const getSnapshot = useCallback(() => writeTab?.ariaSelected === "true", []);
  const githubTabClicked = useSyncExternalStore(subscribe, getSnapshot);

  const [enabled, setEnabled] = useState(false);

  return [enabled && githubTabClicked, setEnabled] as const;
};

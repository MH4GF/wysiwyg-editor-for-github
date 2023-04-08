import {
  useState,
  useCallback,
  FC,
  useSyncExternalStore,
  useMemo,
} from "react";
import { createPortal } from "react-dom";
import { RichTextTabButton } from "./RichTextTabButton";
import { RichTextTabPanel } from "./RichTextTabPanel";

const githubTabnav = document.querySelector(".tabnav-tabs");
if (!githubTabnav) {
  throw new Error("Cannot find tab nav");
}

const useSyncGitHubTabState = () => {
  const writeTab = useMemo(() => {
    return document.querySelector("button.write-tab");
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

export const App = () => {
  const [enabled, setEnabled] = useSyncGitHubTabState();
  const handleClick = useCallback(
    () => setEnabled(!enabled),
    [setEnabled, enabled]
  );

  return (
    <div>
      {createPortal(
        <RichTextTabButton selected={enabled} onClick={handleClick} />,
        githubTabnav
      )}
      <RichTextTabPanel enabled={enabled} />
    </div>
  );
};

import { useCallback } from "react";
import { createPortal } from "react-dom";
import { SELECTORS } from "./GitHubPage/constants";
import { useSyncGitHubTabsState } from "./GitHubPage/useSyncGitHubTabsState";
import { RichTextTabButton } from "./RichTextTabButton";
import { RichTextTabPanel } from "./RichTextTabPanel";

const githubTabnav = document.querySelector(SELECTORS.TABNAV);
if (!githubTabnav) {
  throw new Error("Cannot find tab nav");
}

export const App = () => {
  const [enabled, setEnabled] = useSyncGitHubTabsState();
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
      {enabled ? <RichTextTabPanel /> : null}
    </div>
  );
};

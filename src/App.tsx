import { useCallback } from "react";
import { createPortal } from "react-dom";
import {
  SELECTORS,
  useSyncGitHubTabsState,
  useSyncGitHubTextareaValue,
} from "./GitHubPage";
import { RichTextTabButton } from "./RichTextTabButton";
import { RichTextEditor } from "./RichTextEditor";

const githubTabnav = document.querySelector(SELECTORS.TABNAV);
if (!githubTabnav) {
  throw new Error("Cannot find tab nav");
}

export const App = () => {
  const { value, setValue } = useSyncGitHubTextareaValue();
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
      <div role="tabpanel">
        {enabled ? <RichTextEditor value={value} onUpdate={setValue} /> : null}
      </div>
    </div>
  );
};

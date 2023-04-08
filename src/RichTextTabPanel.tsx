import { FC, useCallback, useMemo, useSyncExternalStore } from "react";
import { RichTextEditor } from "./RichTextEditor";

const useSyncGitHubContentState = () => {
  const textarea = useMemo(() => {
    return document.querySelector(
      "textarea.js-comment-field"
    ) satisfies HTMLTextAreaElement | null;
  }, []);
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      textarea?.addEventListener("input", onStoreChange);
      return () => textarea?.removeEventListener("input", onStoreChange);
    },
    [textarea]
  );
  const getSnapshot = useCallback(() => textarea?.value, []);
  const content = useSyncExternalStore(subscribe, getSnapshot) ?? "";

  const setContent = useCallback(
    (value: string) => {
      if (!textarea) {
        return;
      }

      if (textarea.value === value) {
        return;
      }

      textarea.value = value;
    },
    [textarea]
  );

  return { content, setContent };
};

export const RichTextTabPanel: FC = () => {
  const { content, setContent } = useSyncGitHubContentState();

  return (
    <div role="tabpanel">
      <RichTextEditor value={content} onUpdate={setContent} />
    </div>
  );
};

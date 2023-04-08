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

  return { content };
};

type Props = {
  enabled: boolean;
};

export const RichTextTabPanel: FC<Props> = ({ enabled }) => {
  const { content } = useSyncGitHubContentState();

  return (
    <div role="tabpanel" hidden={!enabled}>
      <RichTextEditor initialValue={content} />
    </div>
  );
};

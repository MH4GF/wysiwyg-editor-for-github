import { useSyncGitHubTextareaValue } from "./GitHubPage/useSyncGitHubTextareaValue";
import { RichTextEditor } from "./RichTextEditor";

export const RichTextTabPanel = () => {
  const { value, setValue } = useSyncGitHubTextareaValue();

  return (
    <div role="tabpanel">
      <RichTextEditor value={value} onUpdate={setValue} />
    </div>
  );
};

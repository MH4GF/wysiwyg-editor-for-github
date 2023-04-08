import { useSyncGitHubTextareaValue } from "./GitHubPage";
import { RichTextEditor } from "./RichTextEditor";

export const RichTextTabPanel = () => {
  const { value, setValue } = useSyncGitHubTextareaValue();

  return (
    <div role="tabpanel">
      <RichTextEditor value={value} onUpdate={setValue} />
    </div>
  );
};

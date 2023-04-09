import { FC, useCallback, useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
  TRANSFORMERS,
} from "@lexical/markdown";
import { EditorState, LexicalEditor } from "lexical";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

type UpdateFromExternalValuePluginProps = {
  value: string;
};

const UpdateFromExternalValuePlugin: FC<UpdateFromExternalValuePluginProps> = ({ value }) => {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    editor.update(() => {
      $convertFromMarkdownString(value, TRANSFORMERS);
    });
  }, [value]);

  return null;
};

type UpdateToExternalValuePluginProps = {
  onUpdate: (value: string) => void;
};

const UpdateToExternalValuePlugin: FC<UpdateToExternalValuePluginProps> = ({ onUpdate }) => {
  const onChange = useCallback(
      (_editorState: EditorState, editor: LexicalEditor) => {
        return editor.update(() => {
          const markdown = $convertToMarkdownString(TRANSFORMERS);
          onUpdate(markdown);
        });
      },
    []
  );

  return <OnChangePlugin onChange={onChange} />;
};

type Props = UpdateFromExternalValuePluginProps & UpdateToExternalValuePluginProps;

export const SyncExternalValuePlugin: FC<Props> = ({ value, onUpdate}) => {
  return (
    <>
      <UpdateFromExternalValuePlugin value={value} />
      <UpdateToExternalValuePlugin onUpdate={onUpdate} />
    </>
  )

}
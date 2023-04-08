import { FC } from "react";

import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { nodes } from "./nodes";
import {
  $convertFromMarkdownString,
  ELEMENT_TRANSFORMERS,
} from "@lexical/markdown";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TreeViewPlugin } from "./plugins";

const theme = {
  // Theme styling goes here
};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
  console.error(error);
}

const initialConfig = (initialValue: string): InitialConfigType => ({
  namespace: "MyEditor",
  editorState: () =>
    $convertFromMarkdownString(initialValue, ELEMENT_TRANSFORMERS),
  theme,
  onError,
  nodes,
});

type Props = {
  initialValue: string;
};

const Editor: FC<Props> = ({ initialValue }) => {
  console.log({ initialValue });
  return (
    <LexicalComposer initialConfig={initialConfig(initialValue)}>
      <MarkdownShortcutPlugin transformers={ELEMENT_TRANSFORMERS} />
      <RichTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<div>Enter some text...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <TreeViewPlugin />
    </LexicalComposer>
  );
};

export const RichTextEditor: FC<Props> = (props) => {
  return (
    <div
      className="write-content tooltipped tooltipped-ne tooltipped-no-delay tooltipped-align-left-1 hide-reaction-suggestion upload-enabled mx-0 mt-2 mb-2 mx-md-2 hx_sm-hide-drag-drop js-reaction-suggestion"
      style={{ width: "100%" }}
    >
      <Editor {...props} />
    </div>
  );
};

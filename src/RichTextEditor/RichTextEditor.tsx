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
import { $convertFromMarkdownString } from "@lexical/markdown";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TreeViewPlugin } from "./plugins";
import { SyncExternalValuePlugin } from "./plugins/SyncExternalValuePlugin";
import { TRANSFORMERS } from "./constants";

const theme = {
  // Theme styling goes here
};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
  console.error(error);
}

const initialConfig = (initialValue: string): InitialConfigType => ({
  namespace: "MyEditor",
  editorState: () => $convertFromMarkdownString(initialValue, TRANSFORMERS),
  theme,
  onError,
  nodes,
});

type Props = {
  value: string;
  onUpdate: (value: string) => void;
  isDebug?: boolean;
};

const Editor: FC<Props> = ({ value, onUpdate, isDebug }) => {
  return (
    <LexicalComposer initialConfig={initialConfig(value)}>
      <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      <RichTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<div>Enter some text...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <SyncExternalValuePlugin value={value} onUpdate={onUpdate} />
      {isDebug ? <TreeViewPlugin /> : <></>}
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

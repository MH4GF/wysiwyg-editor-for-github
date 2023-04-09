import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TreeView } from "@lexical/react/LexicalTreeView";

export const TreeViewPlugin = () => {
  const [editor] = useLexicalComposerContext();

  return (
    <TreeView
      editor={editor}
      viewClassName="debug"
      timeTravelPanelClassName="debug"
      timeTravelButtonClassName="debug"
      timeTravelPanelSliderClassName="debug"
      timeTravelPanelButtonClassName="debug"
    />
  );
};

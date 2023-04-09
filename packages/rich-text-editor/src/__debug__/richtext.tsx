import React from "react";
import ReactDOM from "react-dom/client";
import { RichTextEditor } from "../RichTextEditor";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RichTextEditor
      value="foo"
      onUpdate={(value) => console.log("onUpdate", value)}
      isDebug
    />
  </React.StrictMode>
);

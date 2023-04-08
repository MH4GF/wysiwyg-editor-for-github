import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

const tabContainer = document.querySelector(
  "tab-container.js-previewable-comment-form"
);
if (!tabContainer) {
  throw new Error("Cannot find tab container");
}

const richTextEditorTab = document.createElement("div");
tabContainer.appendChild(richTextEditorTab);
ReactDOM.createRoot(richTextEditorTab).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

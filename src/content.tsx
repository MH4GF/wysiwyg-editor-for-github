import React from "react";
import ReactDOM from "react-dom/client";
import { RichTextEditor } from "./RichTextEditor";

const tabContainer = document.querySelector(
  "tab-container.js-previewable-comment-form"
);
if (!tabContainer) {
  throw new Error("Cannot find tab container");
}

const richTextEditorTab = document.createElement("div");
richTextEditorTab.className =
  "write-content tabnav comment-form-head mb-2 d-flex flex-justify-between p-0 tabnav--responsive flex-column border-bottom-0 mb-0 mb-lg-2 flex-items-stretch border-lg-bottom color-border-default flex-lg-items-center flex-lg-row";
richTextEditorTab.hidden = true;
tabContainer.appendChild(richTextEditorTab);
ReactDOM.createRoot(richTextEditorTab).render(
  <React.StrictMode>
    <RichTextEditor />
  </React.StrictMode>
);

const tabnav = document.querySelector(".tabnav-tabs");
const writeButton = document.querySelector("button.write-tab");
const previewButton = document.querySelector("button.preview-tab");
const writeContainer = document.querySelector(
  "file-attachment.js-upload-markdown-image"
);
const previewContainer = document.querySelector(".js-preview-panel");
if (
  !(
    tabnav &&
    writeButton &&
    previewButton &&
    writeContainer &&
    previewContainer
  )
) {
  throw new Error("Cannot find tab nav");
}

const button = document.createElement("button");
button.innerText = "Rich Text";
button.type = "button";
button.className =
  "btn-link tabnav-tab preview-tab js-preview-tab flex-1 flex-md-auto";

button.addEventListener("click", () => {
  if (tabContainer.classList.contains("preview-selected")) {
    tabContainer.classList.remove("preview-selected");
    tabContainer.classList.add("write-selected");
  }

  writeContainer.hidden = true;
  writeButton.ariaSelected = "false";
  previewContainer.hidden = true;
  previewButton.ariaSelected = "false";

  richTextEditorTab.hidden = false;
  button.ariaSelected = "true";
});

const handleClickOtherButton = () => {
  richTextEditorTab.hidden = true;
  button.ariaSelected = "false";
};

writeButton.addEventListener("click", handleClickOtherButton);
previewButton.addEventListener("click", handleClickOtherButton);

tabnav.appendChild(button);

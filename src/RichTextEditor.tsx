import { FC } from "react";

export const RichTextEditor: FC = () => {
  return (
    <div
      className="write-content tooltipped tooltipped-ne tooltipped-no-delay tooltipped-align-left-1 hide-reaction-suggestion upload-enabled mx-0 mt-2 mb-2 mx-md-2 hx_sm-hide-drag-drop js-reaction-suggestion"
      style={{ width: "100%" }}
    >
      <textarea className="js-comment-field js-paste-markdown js-task-list-field js-quick-submit form-control input-contrast comment-form-textarea js-size-to-fit js-session-resumable js-saved-reply-shortcut-comment-field" />
    </div>
  );
};

import { FC } from "react";

type Props = {
  selected: boolean;
  onClick: () => void;
};

export const RichTextTabButton: FC<Props> = ({ selected, onClick }) => {
  return (
    <button
      type="button"
      className="tabnav-tab"
      role="tab"
      aria-selected={selected}
      onClick={onClick}
    >
      Rich Text
    </button>
  );
};

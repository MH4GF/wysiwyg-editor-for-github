import { FC } from "react";
import { RichTextEditor } from "./RichTextEditor";

type Props = {
  enabled: boolean;
};

export const RichTextTabPanel: FC<Props> = ({ enabled }) => {
  return (
    <div role="tabpanel" hidden={!enabled}>
      <RichTextEditor initialValue="foo" />
    </div>
  );
};

import React, { Dispatch, SetStateAction } from "react";
import Plus from "../../../../../assets/svgs/Plus";

const TagAddButton = ({
  tagId,
  setTags,
}: {
  tagId: React.MutableRefObject<number>;
  setTags: Dispatch<SetStateAction<string[]>>;
}) => (
  <button
    onClick={() => {
      setTags((tags) => tags.concat(`태그 ${tagId.current}`));
      tagId.current++;
    }}
  >
    <Plus />
  </button>
);

export default TagAddButton;

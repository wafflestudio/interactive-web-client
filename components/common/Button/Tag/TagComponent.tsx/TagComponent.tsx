import React, { useRef, useState } from "react";

import styles from "../../Button.module.scss";
import ControlAllButton from "../../ControlAllButton/ControlAllButton";
import TagAddButton from "../TagAddButton/TagAddButton";
import TagButton from "../TagButton/TagButton";

const TagComponent = () => {
  const [tags, setTags] = useState<string[]>(["태그 1", "태그 2", "태그 3"]);
  const tagId = useRef(4);

  return (
    <div className={styles.tagComponent}>
      <ControlAllButton text="모두 삭제" onClick={() => setTags([])} />
      {tags.map((tag) => (
        <TagButton
          key={tag}
          text={tag}
          dark={false}
          onClick={() => setTags((tags) => tags.filter((key) => tag !== key))}
        />
      ))}
      <TagAddButton tagId={tagId} setTags={setTags} />
    </div>
  );
};

export default TagComponent;

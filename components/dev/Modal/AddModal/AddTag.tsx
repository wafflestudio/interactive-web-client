import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../modules";
import { setTags } from "../../../../modules/addModal";

import styles from "./AddModal.module.scss";

const AddTag = () => {
  const [currentTag, setCurrentTag] = useState("");

  const { tag } = useSelector((state: RootState) => state.addModal);

  const dispatch = useDispatch();

  const handleTags = (
    e: KeyboardEvent<HTMLInputElement> | ChangeEvent<HTMLInputElement>,
  ) => {
    const value = (e as ChangeEvent<HTMLInputElement>).target.value;
    setCurrentTag(value);

    if ((e as KeyboardEvent).key !== "Enter") return;
    if (!value.trim()) return;

    dispatch(setTags([...tag, value]));
    setCurrentTag("");
  };

  const deleteTag = (index: number) => {
    dispatch(setTags(tag.filter((el, i) => i !== index)));
  };

  return (
    <div className={styles.tagContainer}>
      <label htmlFor="currentTag">태그</label>
      {tag.map((tag, index) => (
        <div className={styles.tag} key={index}>
          <span className={styles.text}>{tag} </span>
          <button className={styles.delete} onClick={() => deleteTag(index)}>
            &times;
          </button>
        </div>
      ))}
      <input
        type="text"
        className={styles.tagInput}
        id={"currentTag"}
        placeholder="+"
        onKeyDown={handleTags}
        onChange={handleTags}
        value={currentTag}
      />
    </div>
  );
};

export default AddTag;

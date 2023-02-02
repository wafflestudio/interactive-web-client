import React, { Dispatch, SetStateAction } from "react";
import Cancel from "../../../../../assets/svgs/Cancel";

import styles from "../../Button.module.scss";

type TagButtonProps = {
  text: string;
  dark: boolean;
  onClick: Dispatch<SetStateAction<unknown>>;
};

const TagButton = ({ text, dark, onClick }: TagButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.commonButton} ${dark ? styles.dark : ""} ${
        styles.big
      }`}
    >
      <span>{text}</span>
      <Cancel />
    </button>
  );
};

export default TagButton;

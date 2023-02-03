import React from "react";
import Cancel from "../../../../../assets/svgs/Cancel";
import styles from "../../Button.module.scss";
import { TagButtonProps } from "../../types";

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

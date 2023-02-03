import React from "react";
import styles from "../Button.module.scss";
import { ClickableButtonProps } from "../types";

const ClickableButton = ({
  text,
  withIcon,
  iconSrc,
  active,
  big,
  dark,
  onClick,
}: ClickableButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.commonButton} ${dark ? styles.dark : ""} ${
        big ? styles.big : ""
      }  ${active ? styles.active : ""}`}
    >
      <span>{text}</span>
      {withIcon ? <img src={iconSrc} alt={`${text}의 아이콘`} /> : null}
    </button>
  );
};

export default ClickableButton;

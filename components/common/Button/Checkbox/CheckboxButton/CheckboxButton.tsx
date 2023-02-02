import React from "react";
import Check from "../../../../../assets/svgs/Check";
import styles from "../../Button.module.scss";
import { CheckboxButtonProps } from "../../types";

const CheckboxButton = ({
  text,
  withIcon,
  iconSrc,
  active,
  onClick,
}: CheckboxButtonProps) => (
  <button
    onClick={onClick}
    className={`${styles.commonButton} ${styles.checkboxButton} ${
      styles.big
    }  ${active ? styles.active : ""}`}
  >
    {active ? <Check /> : null}
    <span>{text}</span>
    {withIcon ? <img src={iconSrc} alt={`${text}의 아이콘`} /> : null}
  </button>
);

export default CheckboxButton;

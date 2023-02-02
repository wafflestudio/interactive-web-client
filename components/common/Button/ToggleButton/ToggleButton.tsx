import React, { Dispatch, SetStateAction } from "react";
import ToggleOff from "../../../../assets/svgs/ToggleOff";
import ToggleOn from "../../../../assets/svgs/ToggleOn";

import styles from "../Button.module.scss";

const ToggleButton = ({
  text,
  state,
  dark,
  active,
  onClick,
}: {
  text: string;
  state: boolean;
  dark: boolean;
  active: boolean;
  onClick: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.commonButton} ${styles.toggleButton} ${
        dark ? styles.dark : ""
      } ${styles.big} ${active ? styles.active : ""}`}
    >
      {state ? <ToggleOn /> : <ToggleOff />}
      <span>
        {text} {state ? "ON" : "OFF"}
      </span>
    </button>
  );
};

export default ToggleButton;

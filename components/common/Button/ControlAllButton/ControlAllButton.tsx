import React from "react";
import ClickableButton from "../ClickableButton/ClickableButton";

import { ButtonProps } from "../types";

const ControlAllButton = ({ text, onClick }: ButtonProps) => {
  return (
    <ClickableButton
      text={text}
      withIcon={false}
      iconSrc={undefined}
      active
      big={false}
      dark
      onClick={onClick}
    />
  );
};

export default ControlAllButton;

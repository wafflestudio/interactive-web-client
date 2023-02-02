import React, { Dispatch, SetStateAction } from "react";

import ClickableButton from "../ClickableButton/ClickableButton";

const ControlAllButton = ({
  text,
  onClick,
}: {
  text: string;
  onClick: Dispatch<SetStateAction<unknown>>;
}) => {
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

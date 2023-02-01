import React, { useState } from "react";
import CheckboxButton from "../components/common/Button/Checkbox/CheckboxButton/CheckboxButton";
import CheckboxComponent from "../components/common/Button/Checkbox/CheckboxComponent/CheckboxComponent";
import ClickableButton from "../components/common/Button/ClickableButton/ClickableButton";

const Buttons = () => {
  const [clickableButtonState, setClickableButtonState] = useState(false);
  const [checkboxButton1State, setCheckboxButton1State] = useState(false);
  const [checkboxButton2State, setCheckboxButton2State] = useState(false);

  return (
    <div>
      <ClickableButton
        text={clickableButtonState ? "버튼 ON" : "버튼 OFF"}
        withIcon={false}
        big={false}
        iconSrc={undefined}
        active={clickableButtonState}
        onClick={() =>
          setClickableButtonState(
            (clickableButtonState) => !clickableButtonState,
          )
        }
        dark={false}
      />
      <CheckboxButton
        text={checkboxButton1State ? "체크 박스 버튼" : "버튼 활성화"}
        withIcon={false}
        iconSrc={undefined}
        active={checkboxButton1State}
        onClick={() =>
          setCheckboxButton1State((checkButton1State) => !checkButton1State)
        }
        dark={false}
      />
      <CheckboxComponent />
    </div>
  );
};

export default Buttons;

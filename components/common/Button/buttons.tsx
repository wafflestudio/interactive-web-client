import React, { useState } from "react";
import CheckboxButton from "./Checkbox/CheckboxButton/CheckboxButton";
import CheckboxComponent from "./Checkbox/CheckboxComponent/CheckboxComponent";
import ClickableButton from "./ClickableButton/ClickableButton";
import TagComponent from "./Tag/TagComponent.tsx/TagComponent";
import ToggleButton from "./ToggleButton/ToggleButton";
import styles from "./Button.module.scss";

const Buttons = () => {
  const [clickableButtonState, setClickableButtonState] = useState(false);
  const [checkboxButton1State, setCheckboxButton1State] = useState(false);
  const [toggle1State, setToggle1State] = useState(true);
  const [toggle2State, setToggle2State] = useState(false);

  const ping = () => fetch("/msw-ping", { method: "POST" });

  return (
    <div className={styles.container}>
      <ClickableButton
        text="Ping!"
        withIcon={false}
        big={false}
        iconSrc={undefined}
        active={true}
        onClick={ping}
        dark={false}
      />
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
      <TagComponent />
      <ToggleButton
        text={"버튼"}
        dark={false}
        active={false}
        state={toggle1State}
        onClick={() => setToggle1State((state) => !state)}
      />
      <ToggleButton
        text={"버튼"}
        dark
        active
        state={toggle2State}
        onClick={() => setToggle2State((state) => !state)}
      />
    </div>
  );
};

export default Buttons;

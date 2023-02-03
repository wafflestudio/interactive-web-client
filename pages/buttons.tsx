import React, { useState } from "react";
import styles from "../components/common/Button/Button.module.scss";
import CheckboxButton from "../components/common/Button/Checkbox/CheckboxButton/CheckboxButton";
import CheckboxComponent from "../components/common/Button/Checkbox/CheckboxComponent/CheckboxComponent";
import ClickableButton from "../components/common/Button/ClickableButton/ClickableButton";
import TagComponent from "../components/common/Button/Tag/TagComponent.tsx/TagComponent";
import ToggleButton from "../components/common/Button/ToggleButton/ToggleButton";

const Buttons = () => {
  const [clickableButtonState, setClickableButtonState] = useState(false);
  const [checkboxButton1State, setCheckboxButton1State] = useState(false);
  const [toggle1State, setToggle1State] = useState(true);
  const [toggle2State, setToggle2State] = useState(false);

  return (
    <div className={styles.container}>
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

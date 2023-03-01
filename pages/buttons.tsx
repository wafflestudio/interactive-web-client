import axios from "axios";
import React, { useState } from "react";
import {
  MswBooleanRequestResponseType,
  MswPingResponseType,
} from "../api/mocks/types";
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

  const mswPing = async () => {
    try {
      const { data } = await axios.get<MswPingResponseType>("/msw-ping");
      console.log(data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const mswBoolean = async () => {
    try {
      const { data } = await axios.post<MswBooleanRequestResponseType>(
        "/msw-boolean",
        { success: clickableButtonState },
      );
      console.log(data);
      setClickableButtonState(false);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response)
        console.log(error.response.data);
      setClickableButtonState(true);
    }
  };

  return (
    <div className={styles.container}>
      <ClickableButton
        text="Ping!"
        withIcon={false}
        big={false}
        iconSrc={undefined}
        active={true}
        onClick={mswPing}
        dark={false}
      />
      <ClickableButton
        text={clickableButtonState ? "Success" : "Fail"}
        withIcon={false}
        big={false}
        iconSrc={undefined}
        active={clickableButtonState}
        onClick={mswBoolean}
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

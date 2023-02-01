import React, { useState } from "react";
import styles from "../../Button.module.scss";
import ClickableButton from "../../ClickableButton/ClickableButton";
import CheckboxButton from "../CheckboxButton/CheckboxButton";

const dummy = ["check1", "check2", "check3", "check4"];
type ICheckedState = {
  [K in typeof dummy[number]]: boolean;
};

const CheckboxComponent = () => {
  const [checked, setChecked] = useState<ICheckedState>({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
  });

  return (
    <div className={styles.checkboxComponent}>
      <ClickableButton
        text="모두 선택"
        withIcon={false}
        iconSrc={undefined}
        active
        big={false}
        dark
        onClick={() => {
          setChecked((checked) => {
            Object.keys(checked).forEach((key) => {
              checked[key] = true;
            });
            return { ...checked };
          });
        }}
      />
      <ClickableButton
        text="모두 선택 해제"
        withIcon={false}
        iconSrc={undefined}
        active
        big={false}
        dark
        onClick={() => {
          setChecked((checked) => {
            Object.keys(checked).forEach((key) => {
              checked[key] = false;
            });
            return { ...checked };
          });
        }}
      />
      {dummy.map((button) => (
        <CheckboxButton
          key={button}
          text={button}
          active={checked[button]}
          withIcon={false}
          iconSrc={undefined}
          dark={false}
          onClick={() => setChecked({ ...checked, [button]: !checked[button] })}
        />
      ))}
    </div>
  );
};

export default CheckboxComponent;

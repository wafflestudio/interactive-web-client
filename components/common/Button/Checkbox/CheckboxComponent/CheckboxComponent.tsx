import React, { useState } from "react";
import styles from "../../Button.module.scss";
import ControlAllButton from "../../ControlAllButton/ControlAllButton";
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
      <ControlAllButton
        text="모두 선택"
        onClick={() => {
          setChecked((checked) => {
            Object.keys(checked).forEach((key) => {
              checked[key] = true;
            });
            return { ...checked };
          });
        }}
      />
      <ControlAllButton
        text="모두 선택 해제"
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

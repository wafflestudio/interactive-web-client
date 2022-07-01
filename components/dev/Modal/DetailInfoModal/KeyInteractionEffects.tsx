import React from "react";
import KeyboardOptionButton from "../../../templates/OptionButton/KeyboardOptionButton/KeyboardOptionButton";
import SelectionOptionButton from "../../../templates/OptionButton/SelectionOptionButton/SelectionOptionButton";
import TypingOptionButton from "../../../templates/OptionButton/TypingOptionButton/TypingOptionButton";
import styles from "./DetailInfoModal.module.scss";

const KeyInteractionEffects = ({ direction }: { direction: string }) => {
  return (
    <div className={styles.keyEffects}>
      <div className={styles.direction}>{direction}으로</div>
      <KeyboardOptionButton text={"를 누르면 이동합니다"} />
      <TypingOptionButton text={"(px)만큼 이동합니다"} />
      <SelectionOptionButton
        text={"\u00A0소리를 냅니다"}
        options={[
          { name: "발소리1", id: "12" },
          { name: "발소리2", id: "324" },
          { name: "발소리3", id: "224" },
        ]}
      />
      <SelectionOptionButton
        text={"\u00A0이미지가 됩니다"}
        options={[
          { name: "정면이미지", id: "12" },
          { name: "좌측이미지", id: "324" },
          { name: "우측이미지", id: "224" },
          { name: "후면이미지", id: "424" },
        ]}
      />
    </div>
  );
};

export default KeyInteractionEffects;

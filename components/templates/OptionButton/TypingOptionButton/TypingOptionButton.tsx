import styles from "./TypingOptionButton.module.scss";
import { ChangeEventHandler, KeyboardEventHandler, useState } from "react";

interface TypingOptionButtonProps {
  text: string;
}

const TypingOptionButton = ({ text }: TypingOptionButtonProps) => {
  const [value, setValue] = useState("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <input onChange={handleChange} value={value} className={styles.input} />
      {text}
    </div>
  );
};

export default TypingOptionButton;

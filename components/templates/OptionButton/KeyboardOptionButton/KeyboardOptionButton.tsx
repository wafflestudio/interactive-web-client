import styles from "./KeyboardOptionButton.module.scss";
import { KeyboardEventHandler, useState } from "react";

interface KeyboardOptionButtonProps {
  text: string;
}

// 키 설정 취소하려면 ?
const KeyboardOptionButton = ({ text }: KeyboardOptionButtonProps) => {
  const [key, setKey] = useState("");

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === " ") {
      setKey("Space");
    } else setKey(e.key);
  };

  return (
    <div className={styles.wrapper}>
      <input onKeyDown={handleKeyDown} value={key} className={styles.input} />
      {text}
    </div>
  );
};

export default KeyboardOptionButton;

import { useState } from "react";
import styles from "./LongText.module.scss";

type Props = {
  isEditable: boolean;
};

const LongText = ({}: Props) => {
  const [input, setInput] = useState<string>("");
  return (
    <textarea className={styles.LongText} placeholder={"내용을 입력하세요"} />
  );
};
export default LongText;

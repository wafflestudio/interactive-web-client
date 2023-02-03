import { relative } from "path";
import { useState } from "react";
import { IObject, IPage, IProject } from "../../../types/base";
import styles from "./NumberBox.module.scss";

type Props = {
  data: IProject | IObject | IPage;
  propertyName: string;
  inputText?: string;
  editable: boolean;
};

const NumberBox = ({ data, propertyName, inputText, editable }: Props) => {
  const [input, setInput] = useState<number>(
    data[propertyName as keyof typeof data] as number,
  );
  if (isNaN(data[propertyName as keyof typeof data])) {
    return <div>propertyName을 다시 확인해주세요</div>;
  }
  return (
    <div className={styles.container}>
      <span className={styles.InputText}>
        {inputText ? inputText : propertyName}
      </span>
      <input
        className={styles.InputBox}
        disabled={!editable}
        value={input}
        onChange={(e) => {
          //manipulate(data,propertyName,e.target.value)
          setInput(parseInt(e.target.value));
        }}
      />
    </div>
  );
};
export default NumberBox;

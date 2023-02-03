import { relative } from "path";
import { useState } from "react";
import { IObject } from "../../../types/base";
import styles from "./ProgressBar.module.scss";

type Props = {
  data: IObject;
  propertyName: "opacity";
  editable: boolean;
};

const ProgressBar = ({ data, propertyName, editable }: Props) => {
  const [input, setInput] = useState<number>(data[propertyName] as number);
  return (
    <div className={styles.container}>
      <span
        className={styles.ProgressText}
        style={{
          right: `calc(${100 - input} * 0.01 * calc(100% - 18px))`,
        }}
      >
        {input}%
      </span>
      <input
        className={styles.ProgressBar}
        type={"range"}
        disabled={!editable}
        min={0}
        max={100}
        step={1}
        value={input}
        onChange={(e) => {
          //manipulate(data,propertyName,e.target.value)
          setInput(parseInt(e.target.value));
        }}
      />
    </div>
  );
};
export default ProgressBar;

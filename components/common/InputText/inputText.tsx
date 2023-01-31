import { useState } from "react";
import { IProject, ProjectStringProperty } from "../../../types/project";
import styles from "./InputText.module.scss";

type Props = {
  data: IProject;
  propertyName: ProjectStringProperty;
  editable: boolean;
};

const InputText = ({ data, propertyName, editable }: Props) => {
  const [input, setInput] = useState<string>(data[propertyName]);
  return (
    <input
      className={styles.InputText}
      type="text"
      value={input}
      onChange={(e) => {
        //manipulate(data,propertyName,e.target.value)
        setInput(e.target.value);
      }}
    />
  );
};
export default InputText;

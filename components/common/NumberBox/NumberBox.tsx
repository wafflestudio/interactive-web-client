import { useState } from "react";
import { useDispatch } from "react-redux";
import { setObject } from "../../../modules/newObject";
import {
  IObject,
  IPage,
  IProject,
  ITextObject,
  manipulate,
  PickByType,
} from "../../../types/base";
import styles from "./NumberBox.module.scss";

type Props = {
  data: ITextObject;
  propertyName: keyof PickByType<Props["data"], number>;
  inputText?: string;
  editable: boolean;
};

const NumberBox = ({ data, propertyName, inputText, editable }: Props) => {
  const [input, setInput] = useState<number>(data[propertyName]);
  const dispatch = useDispatch();

  if (isNaN(data[propertyName])) {
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
          dispatch(
            setObject(
              manipulate<ITextObject, number>(data)(
                propertyName,
                parseInt(e.target.value),
              ),
            ),
          );
        }}
      />
    </div>
  );
};
export default NumberBox;

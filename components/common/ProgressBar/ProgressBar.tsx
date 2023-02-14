import { useState } from "react";
import { useDispatch } from "react-redux";
import { setObject } from "../../../modules/newObject";
import {
  IObject,
  ITextObject,
  manipulate,
  PickByType,
} from "../../../types/base";
import styles from "./ProgressBar.module.scss";

type Props = {
  data: ITextObject;
  propertyName: keyof PickByType<Props["data"], number>;
  editable: boolean;
};

const ProgressBar = ({ data, propertyName, editable }: Props) => {
  const [input, setInput] = useState<number>(data[propertyName]);
  const dispatch = useDispatch();

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
export default ProgressBar;

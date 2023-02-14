import { useState } from "react";
import { useDispatch } from "react-redux";
import { setObject } from "../../../modules/newObject";
import { ITextObject, manipulate, PickByType } from "../../../types/base";
import styles from "./LongText.module.scss";

type Props = {
  isEditable: boolean;
  data: ITextObject;
  propertyName: keyof PickByType<Props["data"], string>;
};

const LongText = ({ data, propertyName }: Props) => {
  const [input, setInput] = useState<string>(data[propertyName]);
  const dispatch = useDispatch();

  return (
    <textarea
      className={styles.LongText}
      placeholder={"내용을 입력하세요"}
      value={input}
      onChange={(e) => {
        setInput(e.target.value);
        dispatch(
          setObject(
            manipulate<ITextObject, string>(data)(propertyName, e.target.value),
          ),
        );
      }}
    />
  );
};
export default LongText;

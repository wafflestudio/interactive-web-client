import styles from "./SelectionOptionButton.module.scss";
import {
  ChangeEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
  useState,
} from "react";

interface SelectionOptionButtonProps {
  text: string;
  options: { name: string; id: string }[];
}

const SelectionOptionButton = ({
  text,
  options,
}: SelectionOptionButtonProps) => {
  const [selected, setSelected] = useState("");
  const handleSelect: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSelected(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <select
        className={styles.select}
        onChange={handleSelect}
        value={selected}
        required={false}
      >
        <option selected value={""}>
         해당 없음
        </option>
        {options.map((option) => (
          <option value={option.id} key={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {text}
    </div>
  );
};

export default SelectionOptionButton;

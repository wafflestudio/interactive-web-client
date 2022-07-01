import {
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  KeyboardEventHandler,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { ActionDataType } from "../../../types/types";
import styles from "../ImageCell/ImageCell.module.scss";
import editIcon from "/public/images/ic_edit.svg";
import fileIcon from "/public/images/ic_file.svg";
import NormalNavigatorButton from "../NavigatorButton/NormalNavigatorButton/NormalNavigatorButton";
import ActionsDropDown from "../ActionsDropDown/ActionsDropDown";
import { setIn } from "immutable";

interface ImageCellProps {
  primary: boolean;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  imageSrc: string;
  imagePath: string;
  setImage: (src: string) => void;
  moreActions: ActionDataType[];
}

const ImageCell = ({
  primary,
  name,
  setName,
  imageSrc,
  imagePath,
  setImage,
  moreActions,
}: ImageCellProps) => {
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState(name);

  const EnterPressed: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.code === "Enter") {
      setName(nameInput);
      setEditing(false);
    }
  };

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNameInput(e.target.value);
  };

  const handleImageChange = () => {
    // 이미지 선택창 띄우기
    // 가져온 파일로 setImage
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.upper}>
        <div className={styles.flex}>
          {editing ? (
            <input
              value={nameInput}
              onChange={handleNameChange}
              autoFocus
              onKeyDown={EnterPressed}
              onBlur={() => {
                setName(nameInput);
                setEditing(false);
              }}
              className={styles.input}
            />
          ) : (
            <p className={styles.name}>{name}</p>
          )}
          {!primary && (
            <img
              src={editIcon.src}
              onClick={() => setEditing(true)}
              className={styles.edit}
            />
          )}
        </div>
        <ActionsDropDown actions={moreActions} />
      </div>
      <img src={imageSrc} className={styles.image} />
      <div className={styles.pathWrapper}>
        <NormalNavigatorButton
          onButtonClick={handleImageChange}
          isSelected={true}
          text={imagePath}
          imageSrc={fileIcon.src}
        />
      </div>
    </div>
  );
};

export default ImageCell;

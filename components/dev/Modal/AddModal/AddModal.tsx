import {
  ChangeEventHandler,
  Dispatch,
  DragEventHandler,
  SetStateAction,
  useRef,
  useState,
} from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../modules";
import { initialize, setImage, setName } from "../../../../modules/addModal";
import { saveObjects } from "../../../../modules/staticObjects";
import AddImage from "./AddImage";
import AddShape from "./AddShape";
import AddTag from "./AddTag";
import styles from "./AddModal.module.scss";

interface AddModalProps {
  setAddModal: Dispatch<SetStateAction<boolean>>;
}

const AddModal = ({ setAddModal }: AddModalProps) => {
  const [imageUrl, setImageUrl] = useState("");

  const dropbox = useRef<HTMLDivElement>(null);

  const newBead = useSelector((state: RootState) => state.addModal);

  const dispatch = useDispatch();

  const closeModal = () => setAddModal(false);

  const onNameChange: ChangeEventHandler<HTMLInputElement> = ({ target }) =>
    dispatch(setName(target.value));

  // 드래그 앤 드롭 관련 함수들
  const onDragDefault: DragEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const onDragAndDrop: DragEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const dt = e.dataTransfer;
    const files = dt.files;

    dispatch(setImage(files[0]));
    setImageUrl(URL.createObjectURL(files[0]));
  };

  const initializeInput = () => {
    setImageUrl("");
    dispatch(initialize());
  };

  const addBead = () => {
    dispatch(saveObjects([newBead]));
    closeModal();
  };

  return (
    <div className={`${styles.wrapper}`}>
      <main
        ref={dropbox}
        className={styles.container}
        onClick={(e) => e.stopPropagation()}
        onDragEnter={onDragDefault}
        onDragOver={onDragDefault}
        onDrop={onDragAndDrop}
      >
        <label htmlFor="name">
          이름
          <input
            type="text"
            id="name"
            value={newBead.name}
            onChange={onNameChange}
          />
        </label>
        <AddShape imageUrl={imageUrl} />
        <AddImage setImageUrl={setImageUrl} />
        <AddTag />
        <button className={styles.closeModal} onClick={closeModal}>
          &times;
        </button>
        <button className={styles.initialize} onClick={initializeInput}>
          초기화
        </button>
        <button className={styles.add} onClick={addBead}>
          추가
        </button>
      </main>
    </div>
  );
};

export default AddModal;

import { Dispatch, MouseEventHandler, SetStateAction } from "react";
import styles from "./AddModal.module.scss";

interface AddModalProps {
  setAddModal: Dispatch<SetStateAction<boolean>>;
}

const AddModal = ({ setAddModal }: AddModalProps) => {
  const closeModal: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    setAddModal(false);
  };

  return (
    <div className={`${styles.wrapper}`} onClick={closeModal}>
      <div
        className={styles.container}
        onClick={(e) => e.stopPropagation()}
      ></div>
    </div>
  );
};

export default AddModal;

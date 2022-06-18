import { ModalDataType } from "../../../../dummies/modalType";
import styles from "./DetailInfoModal.module.scss";
import { useDispatch } from "react-redux";
import { closeDetailInfoModal } from "../../../../modules/modal";

interface DetailInfoModalProps {
  targetModal: ModalDataType;
}

const DetailInfoModal = ({ targetModal }: DetailInfoModalProps) => {
  const dispatch = useDispatch();

  if (targetModal.target)
    return (
      <>
        <div
          className={styles.wrapper}
          onClick={() => dispatch(closeDetailInfoModal())}
        />
        <div
          className={styles.container}
          onClick={(e) => e.stopPropagation()}
        />
      </>
    );
  else return <></>;
};

export default DetailInfoModal;

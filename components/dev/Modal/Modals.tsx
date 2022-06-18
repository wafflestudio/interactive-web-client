import styles from "./Modals.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../modules";
import { ModalType } from "../../../dummies/modalType";
import SimpleInfoModal from "./SimpleInfoModal/SimpleInfoModal";
import DetailInfoModal from "./DetailInfoModal/DetailInfoModal";

const Modals = () => {
  const modal = useSelector((state: RootState) => {
    return state.modal;
  });

  return (
    <div
      className={`${styles.container} ${
        modal.modals.length == 0 ? styles.off : ""
      }`}
    >
      {modal.modals.map((targetModal) => {
        return (
          <>
            {targetModal.type === ModalType.OBJECT_SIMPLE_INFO &&
              targetModal.target && (
                <SimpleInfoModal targetModal={targetModal} />
              )}
            {targetModal.type === ModalType.OBJECT_DETAIL_INFO &&
              targetModal.target && (
                <DetailInfoModal targetModal={targetModal} />
              )}
          </>
        );
      })}
    </div>
  );
};

export default Modals;

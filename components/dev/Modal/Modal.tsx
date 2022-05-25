import styles from "./Modal.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../modules";
import { ModalType } from "../../../dummies/modalType";
import { useEffect, useRef } from "react";
import { useOutsideChecker } from "../../../functions/mouse/outsideChecker";

const Modal = () => {
  const modal = useSelector((state: RootState) => {
    return state.modal;
  });
  const modalRef = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div
      className={`${styles.container} ${
        modal.modals.length == 0 ? styles.off : ""
      }`}
    >
      {modalRef.current !== null &&
        modal.modals.map(
          (targetModal, i) =>
            ModalType.OBJECT_SIMPLE_INFO &&
            targetModal.target?.geometry && (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: targetModal.target?.geometry.x - 120,
                  top: targetModal.target?.geometry.y,
                  width: "100px",
                  height: "100px",
                  background: "gray",
                }}
                ref={(ref) => (modalRef.current[i] = ref)}
              >
                {targetModal.target?.id}
              </div>
            ),
        )}
    </div>
  );
};

export default Modal;

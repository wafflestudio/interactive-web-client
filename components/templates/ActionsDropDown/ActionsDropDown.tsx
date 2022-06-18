import { ActionDataType } from "../../../types/types";
import actionsIcon from "/public/images/ic_actions.svg";
import styles from "./ActionsDropDown.module.scss";
import { useRef, useState } from "react";
import { useOutsideChecker } from "../../../functions/mouse/outsideChecker";

interface ActionsDropDownProps {
  actions: ActionDataType[];
}

const ActionsDropDown = ({ actions }: ActionsDropDownProps) => {
  const [modal, setModal] = useState(false);
  const modalRef = useRef(null);
  useOutsideChecker(modalRef, setModal);

  return (
    <div className={styles.wrapper}>
      <img
        src={actionsIcon.src}
        className={styles.icon}
        onClick={() => setModal(!modal)}
      />
      {modal && (
        <div className={styles.actionWrapper} ref={modalRef}>
          {actions.map((action, i) => (
            <div
              className={`${styles.action} ${
                i === 0
                  ? styles.first
                  : i === actions.length - 1
                  ? styles.last
                  : ""
              }`}
              key={i}
            >
              {action.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActionsDropDown;

import { Dispatch, MutableRefObject, SetStateAction, useEffect } from "react";
import { ModalDataType } from "../../dummies/modalType";

export const useOutsideChecker = (
  ref: MutableRefObject<null | HTMLDivElement>,
  setModal: (target?: ModalDataType) => void,
  target?: ModalDataType,
) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
        if (target) {
          setModal(target);
        } else {
          setModal();
        }
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);
};

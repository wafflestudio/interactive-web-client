import { Dispatch, MutableRefObject, SetStateAction, useEffect } from "react";

export const useOutsideChecker = (
  ref: MutableRefObject<null | HTMLDivElement>,
  setModal: Dispatch<SetStateAction<boolean>>,
) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
        setModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

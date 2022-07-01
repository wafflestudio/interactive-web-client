import React, { Dispatch, SetStateAction } from "react";
import { MouseMode } from "./DetailInfoModal";
import styles from "./DetailInfoModal.module.scss";

type MouseOptionsType = {
  mouseMode: number;
  setMouseMode: Dispatch<SetStateAction<number>>;
};

const MouseOptions = ({ mouseMode, setMouseMode }: MouseOptionsType) => {
  return (
    <div className={styles.mouseOptions}>
      <div className={styles.op1}>
        <img src="/images/mouse_op1.png" />
        <div className={styles.option}>
          <span>실시간으로 마우스가 위치해 있는 곳으로 이동합니다.</span>
          <div
            className={styles.mouseCheck}
            onClick={() => setMouseMode(MouseMode.OPTION_1)}
          >
            {mouseMode === MouseMode.OPTION_1 ? (
              <img src="/images/check.png" />
            ) : null}
          </div>
        </div>
      </div>
      <div className={styles.op2}>
        <img src="/images/mouse_op2.png" />
        <div className={styles.option}>
          <span>마우스로 클릭한 곳으로 이동합니다.</span>
          <div
            className={styles.mouseCheck}
            onClick={() => setMouseMode(MouseMode.OPTION_2)}
          >
            {mouseMode === MouseMode.OPTION_2 ? (
              <img src="/images/check.png" />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MouseOptions;

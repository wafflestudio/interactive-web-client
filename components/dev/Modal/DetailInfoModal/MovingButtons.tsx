import React, { Dispatch, SetStateAction } from "react";
import SmallNavigatorButton from "../../../templates/NavigatorButton/SmallNavigatorButton/SmallNavigatorButton";
import { MovingMode } from "./DetailInfoModal";
import styles from "./DetailInfoModal.module.scss";

type MovingButtonsType = {
  movingMode: number;
  setMovingMode: Dispatch<SetStateAction<number>>;
};

const MovingButtons = ({ movingMode, setMovingMode }: MovingButtonsType) => {
  return (
    <nav className={styles.movingButtons}>
      <div>
        <SmallNavigatorButton
          onButtonClick={() => setMovingMode(MovingMode.KEYBOARD)}
          text={"키보드"}
          isSelected={movingMode === MovingMode.KEYBOARD}
        />
      </div>
      <div>
        <SmallNavigatorButton
          onButtonClick={() => setMovingMode(MovingMode.MOUSE)}
          text={"마우스"}
          isSelected={movingMode === MovingMode.MOUSE}
        />
      </div>
      <div>
        <SmallNavigatorButton
          onButtonClick={() => setMovingMode(MovingMode.SCROLL)}
          text={"스크롤"}
          isSelected={movingMode === MovingMode.SCROLL}
        />
      </div>
      <div>
        <SmallNavigatorButton
          onButtonClick={() => setMovingMode(MovingMode.AUTO)}
          text={"자동"}
          isSelected={movingMode === MovingMode.AUTO}
        />
      </div>
    </nav>
  );
};

export default MovingButtons;

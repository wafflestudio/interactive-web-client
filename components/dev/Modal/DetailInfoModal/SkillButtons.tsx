import React, { Dispatch, SetStateAction } from "react";
import NormalNavigatorButton from "../../../templates/NavigatorButton/NormalNavigatorButton/NormalNavigatorButton";
import { SkillMode } from "./DetailInfoModal";
import styles from "./DetailInfoModal.module.scss";

type SkillButtonsType = {
  skillMode: number;
  setSkillmode: Dispatch<SetStateAction<number>>;
};

const SkillButtons = ({ skillMode, setSkillmode }: SkillButtonsType) => {
  return (
    <div className={styles.keys}>
      <ul>
        <li>
          <NormalNavigatorButton
            onButtonClick={() => setSkillmode(SkillMode.MOVING_KEY)}
            text={"이동키"}
            isSelected={skillMode === SkillMode.MOVING_KEY}
          />
        </li>
        <li>
          <NormalNavigatorButton
            onButtonClick={() => setSkillmode(SkillMode.SPECIAL_KEY)}
            text={"특수키"}
            isSelected={skillMode === SkillMode.SPECIAL_KEY}
          />
        </li>
        <li>
          <NormalNavigatorButton
            onButtonClick={() => setSkillmode(SkillMode.ABILITY)}
            text={"능력치"}
            isSelected={skillMode === SkillMode.ABILITY}
          />
        </li>
        <li>
          <NormalNavigatorButton
            onButtonClick={() => setSkillmode(SkillMode.RANGE)}
            text={"활동 범위"}
            isSelected={skillMode === SkillMode.RANGE}
          />
        </li>
        <li>
          <NormalNavigatorButton
            onButtonClick={() => setSkillmode(SkillMode.SOUND)}
            text={"사운드"}
            isSelected={skillMode === SkillMode.SOUND}
          />
        </li>
      </ul>
    </div>
  );
};

export default SkillButtons;

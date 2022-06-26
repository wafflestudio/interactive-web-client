import { useState } from "react";
import { useDispatch } from "react-redux";
import { ModalDataType } from "../../../../dummies/modalType";
import { closeDetailInfoModal } from "../../../../modules/modal";
import album from "../../../../public/images/ic_album.svg";
import NormalNavigatorButton from "../../../templates/NavigatorButton/NormalNavigatorButton/NormalNavigatorButton";
import ImageList from "./ImageList";
import KeyInteractionEffects from "./KeyInteractionEffects";
import MouseOptions from "./MouseOptions";
import MovingButtons from "./MovingButtons";
import SkillButtons from "./SkillButtons";
import styles from "./DetailInfoModal.module.scss";

interface DetailInfoModalProps {
  targetModal: ModalDataType;
}

enum ButtonMode {
  SKILL,
  TAG,
  IMAGE,
  SOUND,
}

export enum SkillMode {
  MOVING_KEY,
  SPECIAL_KEY,
  ABILITY,
  RANGE,
  SOUND,
}

export enum MovingMode {
  KEYBOARD,
  MOUSE,
  SCROLL,
  AUTO,
}

export enum MouseMode {
  OPTION_1,
  OPTION_2,
}

const DetailInfoModal = ({ targetModal }: DetailInfoModalProps) => {
  const dispatch = useDispatch();
  const [buttonMode, setButtonMode] = useState(-1);
  const [skillMode, setSkillmode] = useState(-1);
  const [movingMode, setMovingMode] = useState(-1);
  const [mouseMode, setMouseMode] = useState(0);

  const selectSkill = () => {
    setButtonMode(ButtonMode.SKILL);
  };
  const selectTag = () => {
    setButtonMode(ButtonMode.TAG);
  };
  const selectImage = () => {
    setButtonMode(ButtonMode.IMAGE);
  };
  const selectSound = () => {
    setButtonMode(ButtonMode.SOUND);
  };

  if (targetModal.target)
    return (
      <>
        <div
          className={styles.wrapper}
          onClick={() => dispatch(closeDetailInfoModal())}
        />
        <div className={styles.container} onClick={(e) => e.stopPropagation()}>
          <div className={styles.navigator}>
            <div className={`${styles.skill} ${styles.leftTopButton}`}>
              <NormalNavigatorButton
                onButtonClick={selectSkill}
                text={"기능"}
                isSelected={buttonMode === ButtonMode.SKILL}
              />
            </div>
            <div className={`${styles.tag} ${styles.leftTopButton}`}>
              <NormalNavigatorButton
                onButtonClick={selectTag}
                text={"태그/분류"}
                isSelected={buttonMode === ButtonMode.TAG}
              />
            </div>
            <div className={styles.profileImage}></div>
            <div className={`${styles.image} ${styles.leftBottomButton}`}>
              <NormalNavigatorButton
                onButtonClick={selectImage}
                text={"이미지 관리"}
                isSelected={buttonMode === ButtonMode.IMAGE}
                imageSrc={album.src}
              />
            </div>
            <div className={`${styles.sound} ${styles.leftBottomButton}`}>
              <NormalNavigatorButton
                onButtonClick={selectSound}
                text={"소리 관리"}
                isSelected={buttonMode === ButtonMode.SOUND}
              />
            </div>
            <div className={styles.name}>player1</div>
            {buttonMode === ButtonMode.SKILL ? (
              <SkillButtons skillMode={skillMode} setSkillmode={setSkillmode} />
            ) : null}
          </div>
          <div className={styles.divider} />
          {buttonMode === ButtonMode.IMAGE ? <ImageList /> : null}
          {skillMode === SkillMode.MOVING_KEY &&
          buttonMode === ButtonMode.SKILL ? (
            <div className={styles.keyButtons}>
              <h1>이동키</h1>
              <MovingButtons
                movingMode={movingMode}
                setMovingMode={setMovingMode}
              />
            </div>
          ) : null}
          {movingMode === MovingMode.KEYBOARD &&
          buttonMode === ButtonMode.SKILL ? (
            <div className={styles.keyboardButtons}>
              <div className={styles.top}>
                <KeyInteractionEffects direction={"상단"} />
              </div>
              <div className={styles.bottom}>
                <KeyInteractionEffects direction={"하단"} />
              </div>
              <div className={styles.left}>
                <KeyInteractionEffects direction={"좌측"} />
              </div>
              <div className={styles.right}>
                <KeyInteractionEffects direction={"우측"} />
              </div>
            </div>
          ) : null}
          {movingMode === MovingMode.MOUSE &&
          buttonMode === ButtonMode.SKILL ? (
            <MouseOptions mouseMode={mouseMode} setMouseMode={setMouseMode} />
          ) : null}
        </div>
      </>
    );
  else return <></>;
};

export default DetailInfoModal;

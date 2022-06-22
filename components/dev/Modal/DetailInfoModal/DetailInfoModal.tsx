import { useState } from "react";
import { useDispatch } from "react-redux";
import { ModalDataType } from "../../../../dummies/modalType";
import { closeDetailInfoModal } from "../../../../modules/modal";
import album from "../../../../public/images/ic_album.svg";
import NormalNavigatorButton from "../../../templates/NavigatorButton/NormalNavigatorButton/NormalNavigatorButton";
import SmallNavigatorButton from "../../../templates/NavigatorButton/SmallNavigatorButton/SmallNavigatorButton";
import KeyboardOptionButton from "../../../templates/OptionButton/KeyboardOptionButton/KeyboardOptionButton";
import SelectionOptionButton from "../../../templates/OptionButton/SelectionOptionButton/SelectionOptionButton";
import TypingOptionButton from "../../../templates/OptionButton/TypingOptionButton/TypingOptionButton";
import ImageList from "./ImageList";
import KeyInteractionEffects from "./KeyInteractionEffects";
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

const DetailInfoModal = ({ targetModal }: DetailInfoModalProps) => {
  const dispatch = useDispatch();
  const [normalMode, setNormalMode] = useState(-1);
  const [skillMode, setSkillmode] = useState(-1);
  const [movingMode, setMovingMode] = useState(-1);
  const [smallMode, setSmallMode] = useState("");
  const [imageName, setImageName] = useState("추가 이미지");
  const selectSkill = () => {
    setNormalMode(ButtonMode.SKILL);
  };
  const selectTag = () => {
    setNormalMode(ButtonMode.TAG);
  };
  const selectImage = () => {
    setNormalMode(ButtonMode.IMAGE);
  };
  const selectSound = () => {
    setNormalMode(ButtonMode.SOUND);
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
                isSelected={normalMode === ButtonMode.SKILL}
              />
            </div>
            <div className={`${styles.tag} ${styles.leftTopButton}`}>
              <NormalNavigatorButton
                onButtonClick={selectTag}
                text={"태그/분류"}
                isSelected={normalMode === ButtonMode.TAG}
              />
            </div>
            <div className={styles.profileImage}></div>
            <div className={`${styles.image} ${styles.leftBottomButton}`}>
              <NormalNavigatorButton
                onButtonClick={selectImage}
                text={"이미지 관리"}
                isSelected={normalMode === ButtonMode.IMAGE}
                imageSrc={album.src}
              />
            </div>
            <div className={`${styles.sound} ${styles.leftBottomButton}`}>
              <NormalNavigatorButton
                onButtonClick={selectSound}
                text={"소리 관리"}
                isSelected={normalMode === ButtonMode.SOUND}
              />
            </div>
            <div className={styles.name}>player1</div>
            {normalMode === ButtonMode.SKILL ? (
              <SkillButtons skillMode={skillMode} setSkillmode={setSkillmode} />
            ) : null}
          </div>
          <div className={styles.divider} />
          {/* <div className={styles.half}>
            <KeyboardOptionButton text={"를 누르면 이동합니다"} />
            <SelectionOptionButton
              text={"\u00A0소리를 냅니다"}
              options={[
                { name: "발소리1", id: "12" },
                { name: "발소리2", id: "324" },
                { name: "발소리3", id: "224" },
              ]}
            />
            <TypingOptionButton text={"(px)만큼 이동합니다"} />
          </div> */}
          {normalMode === ButtonMode.IMAGE ? <ImageList /> : null}
          {skillMode === SkillMode.MOVING_KEY ? (
            <MovingButtons
              movingMode={movingMode}
              setMovingMode={setMovingMode}
            />
          ) : null}
          {movingMode === MovingMode.KEYBOARD ? (
            <div className={styles.keyButtons}>
              <h1>이동키</h1>
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
        </div>
      </>
    );
  else return <></>;
};

export default DetailInfoModal;

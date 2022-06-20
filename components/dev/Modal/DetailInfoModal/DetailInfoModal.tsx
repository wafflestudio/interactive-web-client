import { useState } from "react";
import { useDispatch } from "react-redux";
import { ModalDataType } from "../../../../dummies/modalType";
import { closeDetailInfoModal } from "../../../../modules/modal";
import album from "../../../../public/images/ic_album.svg";
import ImageCell from "../../../templates/ImageCell/ImageCell";
import NormalNavigatorButton from "../../../templates/NavigatorButton/NormalNavigatorButton/NormalNavigatorButton";
import SmallNavigatorButton from "../../../templates/NavigatorButton/SmallNavigatorButton/SmallNavigatorButton";
import KeyboardOptionButton from "../../../templates/OptionButton/KeyboardOptionButton/KeyboardOptionButton";
import sampleImg from "/public/images/ex_ghost.png";
import SelectionOptionButton from "../../../templates/OptionButton/SelectionOptionButton/SelectionOptionButton";
import TypingOptionButton from "../../../templates/OptionButton/TypingOptionButton/TypingOptionButton";
import styles from "./DetailInfoModal.module.scss";

interface DetailInfoModalProps {
  targetModal: ModalDataType;
}

enum ButtonMode {
  SKILL = "기능",
  TAG = "태그/분류",
  IMAGE = "이미지 관리",
  SOUND = "소리 관리",
}

const DetailInfoModal = ({ targetModal }: DetailInfoModalProps) => {
  const dispatch = useDispatch();
  const [normalMode, setNormalMode] = useState("");
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
          <div className={styles.imageList}>
            <ul>
              <li>
                <ImageCell
                  primary={true}
                  name={"대표 이미지"}
                  setName={() => {}}
                  imageSrc={sampleImg.src}
                  imagePath={"C:UsersWebgamOneDrive문서"}
                  setImage={() => {}}
                  moreActions={[
                    { text: "기능1", function: () => {} },
                    { text: "기능2", function: () => {} },
                  ]}
                />
              </li>
              <li>
                <ImageCell
                  primary={false}
                  name={imageName}
                  setName={setImageName}
                  imageSrc={sampleImg.src}
                  imagePath={"C:UsersWebgamOneDrive문서"}
                  setImage={() => {}}
                  moreActions={[
                    { text: "기능1", function: () => {} },
                    { text: "기능2", function: () => {} },
                  ]}
                />
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  else return <></>;
};

export default DetailInfoModal;

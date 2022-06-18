import { ModalDataType } from "../../../../dummies/modalType";
import styles from "./DetailInfoModal.module.scss";
import { useDispatch } from "react-redux";
import { closeDetailInfoModal } from "../../../../modules/modal";
import NormalNavigatorButton from "../../../templates/NavigatorButton/NormalNavigatorButton/NormalNavigatorButton";
import { useState } from "react";
import album from "../../../../public/images/ic_album.svg";
import SmallNavigatorButton from "../../../templates/NavigatorButton/SmallNavigatorButton/SmallNavigatorButton";
import KeyboardOptionButton from "../../../templates/OptionButton/KeyboardOptionButton/KeyboardOptionButton";
import ImageCell from "../../../templates/ImageCell/ImageCell";
import sampleImg from "/public/images/ex_ghost.png";
import SelectionOptionButton from "../../../templates/OptionButton/SelectionOptionButton/SelectionOptionButton";
import TypingOptionButton from "../../../templates/OptionButton/TypingOptionButton/TypingOptionButton";

interface DetailInfoModalProps {
  targetModal: ModalDataType;
}

enum ButtonMode {
  EXAMPLE_1 = "example1",
  EXAMPLE_2 = "example2",
}

const DetailInfoModal = ({ targetModal }: DetailInfoModalProps) => {
  const dispatch = useDispatch();
  const [normalMode, setNormalMode] = useState(ButtonMode.EXAMPLE_1);
  const [smallMode, setSmallMode] = useState(ButtonMode.EXAMPLE_2);
  const [imageName, setImageName] = useState("추가 이미지");
  const normal1Function = () => {
    setNormalMode(ButtonMode.EXAMPLE_1);
  };
  const normal2Function = () => {
    setNormalMode(ButtonMode.EXAMPLE_2);
  };
  const small1Function = () => {
    setSmallMode(ButtonMode.EXAMPLE_1);
  };
  const small2Function = () => {
    setSmallMode(ButtonMode.EXAMPLE_2);
  };

  if (targetModal.target)
    return (
      <>
        <div
          className={styles.wrapper}
          onClick={() => dispatch(closeDetailInfoModal())}
        />
        <div className={styles.container} onClick={(e) => e.stopPropagation()}>
          <div className={styles.half}>
            <NormalNavigatorButton
              onButtonClick={normal1Function}
              text={"예시 큰 버튼 1"}
              isSelected={normalMode === ButtonMode.EXAMPLE_1}
            />
            <NormalNavigatorButton
              onButtonClick={normal2Function}
              text={"예시 큰 버튼 2"}
              isSelected={normalMode === ButtonMode.EXAMPLE_2}
              imageSrc={album.src}
            />
            <SmallNavigatorButton
              onButtonClick={small1Function}
              isSelected={smallMode === ButtonMode.EXAMPLE_1}
              text={"예시 작은 버튼"}
            />
            <SmallNavigatorButton
              onButtonClick={small2Function}
              isSelected={smallMode === ButtonMode.EXAMPLE_2}
              text={"예시 작은 버튼"}
            />
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
          </div>
          <div className={styles.half}>
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
          </div>
        </div>
      </>
    );
  else return <></>;
};

export default DetailInfoModal;

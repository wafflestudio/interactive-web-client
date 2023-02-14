import { NextPage } from "next";
import { useState } from "react";
import { useSelector } from "react-redux";
import ClickableButton from "../components/common/Button/ClickableButton/ClickableButton";
import DividingLine from "../components/common/DividingLine/DividingLine";
import LongText from "../components/common/LongText/LongText";
import NumberBox from "../components/common/NumberBox/NumberBox";
import ProgressBar from "../components/common/ProgressBar/ProgressBar";
import { RootState } from "../modules";
import styles from "./commonComponent.module.scss";

const CommonComponent: NextPage = () => {
  const sample = useSelector((state: RootState) => state.newObject.current);
  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <LongText
          data={sample}
          propertyName={"textContent"}
          isEditable={true}
        />
        <DividingLine vertical={false} />
        <NumberBox data={sample} propertyName={"positionX"} editable={true} />
        <NumberBox data={sample} propertyName={"positionY"} editable={true} />
        <DividingLine vertical={false} />
        <div className={styles.wrapper}>
          width:
          <ProgressBar data={sample} propertyName={"width"} editable={true} />
        </div>
        <div className={styles.wrapper}>
          height:
          <ProgressBar data={sample} propertyName={"height"} editable={true} />
        </div>
        <DividingLine vertical={false} />
        <div className={styles.wrapper}>
          <NumberBox data={sample} propertyName={"opacity"} editable={true} />
        </div>
      </div>
      <div
        className={styles.textObject}
        key={sample.id}
        style={{
          width: sample.width * 2,
          height: sample.height * 2,
          transform: `translate(${sample.positionX}px,${sample.positionY}px)`,
          opacity: sample.opacity * 0.01,
        }}
      >
        {sample.textContent}
      </div>
    </div>
  );
};

export default CommonComponent;

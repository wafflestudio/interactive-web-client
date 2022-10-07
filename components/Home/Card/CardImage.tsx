import React from "react";
import { dummyCardType } from "../../../dummies/dummyCards";
import styles from "../HomePage.module.scss";

// 카드 상단 이미지
const CardImage = ({ card }: { card: dummyCardType }) => {
  return (
    <div className={styles.cardImage}>
      <img src={card.src} alt={`${card.title}의 이미지`} />
    </div>
  );
};

export default CardImage;

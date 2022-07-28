import React from "react";
import { dummyCardType } from "../../../dummies/dummyCards";
import styles from "../HomePage.module.scss";
import CardImage from "./CardImage";
import CardInfo from "./CardInfo";

// 개별 카드 아이템
const CardItem = ({ card }: { card: dummyCardType }) => {
  return (
    <div className={styles.cardItem}>
      <CardImage card={card} />
      <CardInfo card={card} />
    </div>
  );
};

export default CardItem;

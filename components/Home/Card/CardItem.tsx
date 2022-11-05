import React from "react";
import { dummyCardType } from "../../../dummies/dummyCards";
import { ProjectDataType } from "../../../types/types";
import CardImage from "./CardImage";
import CardInfo from "./CardInfo";
import CardMark from "./CardMark";
import styles from "./Card.module.scss";

// 개별 카드 아이템
const CardItem = ({ card }: { card: dummyCardType }) => {
  return (
    <div className={styles.cardItem}>
      {card.feature !== undefined ? <CardMark card={card} /> : null}
      <CardImage card={card} />
      <CardInfo card={card} />
    </div>
  );
};

export default CardItem;

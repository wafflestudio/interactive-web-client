import React from "react";
import { dummyCards } from "../../../dummies/dummyCards";
import styles from "../HomePage.module.scss";
import CardItem from "./CardItem";

// 카드 리스트(더미데이터에서 불러옴)
const CardList = () => {
  return (
    <div className={styles.cardList}>
      {dummyCards.map((card) => (
        <CardItem key={card.id} card={card} />
      ))}
    </div>
  );
};

export default CardList;

import React from "react";
import styles from "../HomePage.module.scss";
import CardInfo from "./CardInfo";
import CardItem from "./CardItem";

const CardList = () => {
  return (
    <div className={styles.cardList}>
      <CardItem />
      <CardInfo />
    </div>
  );
};

export default CardList;

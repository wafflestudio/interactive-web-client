import React from "react";
import BookMark from "../../../assets/svgs/BookMark";
import { CardFeature, dummyCardType } from "../../../dummies/dummyCards";
import styles from "./Card.module.scss";

const CardMark = ({ card }: { card: dummyCardType }) => {
  return (
    <div className={styles.cardMark}>
      <BookMark />
      <div className={styles.text}>
        <span className="card-bookmark-bold">
          {card.feature === CardFeature.HITS
            ? "조회수"
            : card.feature === CardFeature.LIKES
            ? "좋아요"
            : null}
        </span>
        <span className="card-bookmark-light">TOP</span>
      </div>
    </div>
  );
};

export default CardMark;

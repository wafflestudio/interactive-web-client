import React, { useCallback } from "react";
import { dummyCardType } from "../../../dummies/dummyCards";
import styles from "./Card.module.scss";

// 카드 하단 제목 + 태그
const CardInfo = ({ card }: { card: dummyCardType }) => {
  const CardWrapper = useCallback(
    (children) => (
      <div
        {...children}
        className={styles.cardInfo}
        style={{ background: card.background }}
      ></div>
    ),
    [card.background],
  );

  return (
    <>
      <CardWrapper>
        <h2 className={"card-title-font"}>{card.title}</h2>
        <div className={"card-tag-font"}>
          {card.tags.map((tag) => `#${tag} `)}
        </div>
      </CardWrapper>
    </>
  );
};

export default CardInfo;

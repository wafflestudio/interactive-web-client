import React from "react";
import {
  dummyCards,
  dummyCardType,
  projectToDummyCard,
} from "../../../dummies/dummyCards";
import { useGetAllProjectQuery } from "../../../modules/api/projectApi";
import { ProjectDataType } from "../../../types/types";
// import { FetchableComponent } from "../../common/FetchableComponent";
import CardItem from "./CardItem";
import styles from "./Card.module.scss";

// 카드 리스트(더미데이터에서 불러옴)

const CardList = () => {
  const { isFetching, data } = useGetAllProjectQuery();

  return (
    <div className={styles.cardList}>
      <FetchableComponent
        data={data?.data}
        isFetching={isFetching}
        successComponent={
          <>
            {data?.data.map((project) => (
              <CardItem card={projectToDummyCard(project)} key={project.id} />
            ))}
          </>
        }
        failComponent={
          <>
            {dummyCards.map((card) => (
              <CardItem key={card.id} card={card} />
            ))}
          </>
        }
      />

      {}
    </div>
  );
};

export default CardList;

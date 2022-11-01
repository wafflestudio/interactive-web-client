import React from "react";
import { dummyCards, dummyCardType } from "../../../dummies/dummyCards";
import { useGetAllProjectQuery } from "../../../modules/api/projectApi";
import { ProjectDataType } from "../../../types/types";
import { FetchableComponent } from "../../common/FetchableComponent";
import styles from "../HomePage.module.scss";
import CardItem from "./CardItem";

// 카드 리스트(더미데이터에서 불러옴)
const projectToDummyCard = (project: ProjectDataType): dummyCardType => ({
  id: project.id,
  title: project.title,
  tags: [],
  background: "#37204E",
  src: "",
});

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
              <CardItem card={projectToDummyCard(project)} />
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

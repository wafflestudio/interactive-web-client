import type { NextPage } from "next";

import DynamicCanvas from "../../components/dev/DynamicCanvas/DynamicCanvas";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { sampleObjectDummy } from "../../dummies/sampleObjectDummy";
import Modal from "../../components/dev/Modal/Modal";
import { saveObjects } from "../../modules/staticObjects";
import StaticContainer from "../../components/dev/StaticContainer/StaticContainer";

const Index: NextPage = () => {
  const dispatch = useDispatch();

  //API 호출을 통한 데이터 로드를 대신하는 부분
  useEffect(() => {
    dispatch(saveObjects(sampleObjectDummy));
  }, []);

  return (
    <>
      <StaticContainer />
      <DynamicCanvas />
      <Modal />
    </>
  );
};

export default Index;

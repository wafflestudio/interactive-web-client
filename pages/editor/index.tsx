import type { NextPage } from "next";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initiateWebSocket } from "../../api/websocket";
import DynamicCanvas from "../../components/dev/DynamicCanvas/DynamicCanvas";
import Modal from "../../components/dev/Modal/Modals";
import Modals from "../../components/dev/Modal/Modals";
import StaticContainer from "../../components/dev/StaticContainer/StaticContainer";
import { sampleObjectDummy } from "../../dummies/sampleObjectDummy";
import { RootState } from "../../modules";
import { saveObjects } from "../../modules/staticObjects";

const Index: NextPage = () => {
  const dispatch = useDispatch();

  const socket = useSelector((state: RootState) => state.ws.current);

  //API 호출을 통한 데이터 로드를 대신하는 부분
  useEffect(() => {
    dispatch(saveObjects(sampleObjectDummy));
    initiateWebSocket();

    return () => socket?.close();
  }, []);

  if (!socket) return null;

  return (
    <>
      <StaticContainer />
      <Modals />
      <DynamicCanvas />
    </>
  );
};

export default Index;

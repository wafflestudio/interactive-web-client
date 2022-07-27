import type { NextPage } from "next";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initiateWebSocket } from "../../api/websocket";
import DynamicCanvas from "../../components/dev/DynamicCanvas/DynamicCanvas";
import Modals from "../../components/dev/Modal/Modals";
import PixiCanvas from "../../components/Editor/PixiCanvas/PixiCanvas";
import StaticContainer from "../../components/Editor/StaticContainer/StaticContainer";
import { sampleObjectDummy } from "../../dummies/sampleObjectDummy";
import { RootState } from "../../modules";
import { saveObjects } from "../../modules/staticObjects";

const Index: NextPage = () => {
  const dispatch = useDispatch();
  const route = useRouter();
  const socket = useSelector((state: RootState) => state.ws.current);
  const message = useSelector((state: RootState) => {
    return state.ws.recentMessage;
  });
  //API 호출을 통한 데이터 로드를 대신하는 부분
  useEffect(() => {
    initiateWebSocket();
    dispatch(saveObjects(sampleObjectDummy));
    return () => socket?.close();
  }, [route]);

  useEffect(() => {
    //    console.log(message);
  }, [message]);

  if (!socket) return null;

  return (
    <>
      <StaticContainer />
      <Modals />
      <PixiCanvas />
    </>
  );
};

export default Index;

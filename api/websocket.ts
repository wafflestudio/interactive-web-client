import { setWs } from "../modules/ws";
import { store } from "../pages/_app";

const wsURL = ""; // [ws://] 또는 [wss://]로 시작해야 합니다

export const initiateWebSocket = () => {
  const socket = store.getState().ws.socket;
  if (!socket) {
    const newSocket = new WebSocket(wsURL);
    newSocket.onopen = () => {
      console.log("connected to " + wsURL);
    };
    newSocket.onclose = (error) => {
      console.log("disconnect from " + wsURL);
      console.log(error);
    };
    newSocket.onerror = (error) => {
      console.log("connection error " + wsURL);
      console.log(error);
    };
    store.dispatch(setWs(newSocket));
  } else {
    console.log("websocket already exist");
  }
};

/*
[WebSocket 이용법]
  리덕스 스토어에서 useSelector로 ws를 가져온다음
  데이터 전송 시에는
    ws.current.send("string data");
  데이터 수신 시에는
    ws.current.onmessage((message)=>{callback});
 */

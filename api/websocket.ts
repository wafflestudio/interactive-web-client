import { setWs } from "../modules/ws";
import { store } from "../pages/_app";

const wsURL = "ws://iwe-server/api/v1/ws/project/1/"; // [ws://] 또는 [wss://]로 시작해야 합니다
//const wsURL =
//"wss://demo.piesocket.com/v3/channel_1?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self";
export const initiateWebSocket = () => {
  const socket = store.getState().ws.current;
  if (!socket) {
    const newSocket = new WebSocket(wsURL);
    newSocket.onopen = () => {
      console.log("connected to " + wsURL);
      store.dispatch(setWs(newSocket));
    };
    newSocket.onclose = (error) => {
      console.log("disconnect from " + wsURL);
      console.log(error);
    };
    newSocket.onerror = (error) => {
      console.log("connection error " + wsURL);
      console.log(error);
    };
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

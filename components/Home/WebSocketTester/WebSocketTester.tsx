import { useEffect } from "react";
import { useSelector } from "react-redux";
import { initiateWebSocket } from "../../../api/websocket";
import { RootState } from "../../../modules";
import styles from "../HomePage.module.scss";

const WebSocketTester = () => {
  const socket = useSelector((state: RootState) => {
    return state.ws.current;
  });
  const message = useSelector((state: RootState) => {
    return state.ws.recentMessage;
  });

  useEffect(() => {
    if (message !== null) {
      console.log(`received message is : ${message.content}`);
    }
  }, [message]);

  return (
    <div className={styles.wstest}>
      <button
        onClick={() => {
          initiateWebSocket();
        }}
      >
        init
      </button>
      <button
        onClick={() => {
          if (socket) {
            socket.send("abc");
          }
        }}
      >
        send
      </button>
      <button
        onClick={() => {
          if (socket) {
            socket.close();
          }
        }}
      >
        close
      </button>
    </div>
  );
};

export default WebSocketTester;

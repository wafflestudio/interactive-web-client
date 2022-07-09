import { useSelector } from "react-redux";
import { initiateWebSocket } from "../../../api/websocket";
import { RootState } from "../../../modules";
import styles from "../HomePage.module.scss";

const WebSocketTester = () => {
  const socket = useSelector((state: RootState) => {
    return state.ws.current;
  });
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

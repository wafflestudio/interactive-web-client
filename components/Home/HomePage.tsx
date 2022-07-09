import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { api } from "../../api/api";
import { initiateWebSocket } from "../../api/websocket";
import { setUser } from "../../modules/user";
import HomeMain from "./Main/HomeMain";
import PageHead from "./PageHead";
import SideBar from "./Sidebar/SideBar";
import WebSocketTester from "./WebSocketTester/WebSocketTester";
import styles from "./HomePage.module.scss";

export default function HomePage() {
  return (
    <>
      <PageHead />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <SideBar />
          <HomeMain />
        </div>
      </div>
      <WebSocketTester />
    </>
  );
}

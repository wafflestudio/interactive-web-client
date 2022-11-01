import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CardList from "./Card/CardList";
import HomeBanner from "./HomeBanner";
import HomeHeader from "./HomeHeader";
import HomeLogo from "./HomeLogo";
import HomeSidebar from "./HomeSidebar";
import PageHead from "./PageHead";
import styles from "./HomePage.module.scss";
const newWsURL = "wss://webgam-server.shop/ws/project/1/";

// 홈 화면 전체
export default function HomePage() {
  const [isSideBar, setIsSideBar] = useState<boolean>(false);

  useEffect(() => {
    // const token = localStorage.getItem("accessToken");
    //   const websocket = new WebSocket(`${newWsURL}?access_token=${token}`);
    //   websocket.onopen = () => {
    //     console.log("open!");
    //     setWs(websocket);
    //   };
  }, []);

  return (
    <>
      <PageHead />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <HomeHeader setIsSidebar={setIsSideBar} />
          {isSideBar && <HomeSidebar setIsSidebar={setIsSideBar} />}
          <HomeLogo />
          <HomeBanner />
          <CardList />
        </div>
      </div>
    </>
  );
}

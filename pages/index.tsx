import { useState } from "react";

import HomeBanner from "../components/Home/Banner/HomeBanner";
import CardList from "../components/Home/Card/CardList";
import Header from "../components/Home/Header/Header";
import HomeHead from "../components/Home/HomeHead";
import Logo from "../components/Home/Logo/Logo";
import Sidebar from "../components/Home/Sidebar/Sidebar";

import styles from "./Home.module.scss";

// 홈 화면 전체
const Home = () => {
  const [isSideBar, setIsSideBar] = useState<boolean>(false);

  return (
    <>
      <HomeHead />
      <div className={styles.Home}>
        <article className={styles.container}>
          <Header setIsSidebar={setIsSideBar} />
          {/* {isSideBar && <Sidebar setIsSidebar={setIsSideBar} />} */}
          <Logo />
          <HomeBanner />
          {/* <CardList /> */}
        </article>
      </div>
    </>
  );
};

export default Home;

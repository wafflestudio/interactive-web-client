import { useState } from "react";
import CardList from "./Card/CardList";
import HomeBanner from "./HomeBanner";
import HomeHeader from "./HomeHeader";
import HomeLogo from "./HomeLogo";
import HomeSidebar from "./HomeSidebar";
import PageHead from "./PageHead";
import styles from "./HomePage.module.scss";

// 홈 화면 전체
export default function HomePage() {
  const [isSideBar, setIsSideBar] = useState<boolean>(false);

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

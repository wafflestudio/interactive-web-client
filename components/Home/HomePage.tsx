import BannerRigthIcon from "../../assets/svgs/BannerRigthIcon";
import Card from "./Card/CardItem";
import CardList from "./Card/CardList";
import HomeBanner from "./HomeBanner";
import HomeHeader from "./HomeHeader";
import HomeLogo from "./HomeLogo";
import PageHead from "./PageHead";
import styles from "./HomePage.module.scss";

export default function HomePage() {
  return (
    <>
      <PageHead />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <HomeHeader />
          <HomeLogo />
          <HomeBanner />
          <CardList />
        </div>
      </div>
    </>
  );
}

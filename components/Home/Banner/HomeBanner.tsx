import BannerRightIcon from "../../../assets/svgs/BannerRightIcon";
import { dummyBanners } from "../../../dummies/dummyBanners";
import styles from "./HomeBanner.module.scss";

// 공지사항 등에 사용될 배너
const HomeBanner = () => {
  return (
    <article className={styles.bannerContainer}>
      <img src={dummyBanners[0]} alt="배너 이미지" className={styles.banner} />
      <button className={styles.left}>
        <BannerRightIcon />
      </button>
      <button className={styles.right}>
        <BannerRightIcon />
      </button>
    </article>
  );
};

export default HomeBanner;

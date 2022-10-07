import React from "react";
import BannerRigthIcon from "../../assets/svgs/BannerRigthIcon";
import styles from "./HomePage.module.scss";

// 공지사항 등에 사용될 배너
const HomeBanner = () => {
  const bannerList = [
    "https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1658572352229-14bbe60b3c5b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDUwfGJvOGpRS1RhRTBZfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1658494787698-cc4371e62441?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDUzfGJvOGpRS1RhRTBZfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  ];

  return (
    <article className={styles.bannerContainer}>
      <img src={bannerList[0]} alt="배너 이미지" className={styles.banner} />
      <button className={styles.left}>
        <BannerRigthIcon />
      </button>
      <button className={styles.right}>
        <BannerRigthIcon />
      </button>
    </article>
  );
};

export default HomeBanner;

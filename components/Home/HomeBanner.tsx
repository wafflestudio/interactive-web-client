import React from "react";
import BannerRigthIcon from "../../assets/svgs/BannerRigthIcon";
import styles from "./HomePage.module.scss";

const HomeBanner = () => {
  return (
    <article className={styles.bannerContainer}>
      <img
        src={
          "https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        }
        className={styles.banner}
      />
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

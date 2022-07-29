import React from "react";
import MoreIcon from "../../assets/svgs/MoreIcon";
import styles from "./HomePage.module.scss";

const HomeHeader = () => {
  return (
    <header className={styles.homeHeader}>
      <button className={styles.moreButton}>
        <MoreIcon />
      </button>
      <div className={styles.user}>
        <div className={`${styles.signButtons} sign-font`}>
          <button className={`${styles.signin} sign-font`}>로그인</button>|
          <button className={`${styles.signup} sign-font`}>회원가입</button>
        </div>
        <div className={styles.profile} />
      </div>
    </header>
  );
};

export default HomeHeader;

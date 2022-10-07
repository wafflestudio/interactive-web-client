import React from "react";
import styles from "./HomePage.module.scss";

// 홈 화면 로고
const HomeLogo = () => {
  return (
    <img
      src={"/images/logo/home.png"}
      alt={"Welcome to webgam"}
      className={styles.logo}
    />
  );
};

export default HomeLogo;

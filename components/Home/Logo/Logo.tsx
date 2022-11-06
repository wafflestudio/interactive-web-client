import React from "react";
import styles from "./Logo.module.scss";

// 홈 화면 로고
const Logo = () => {
  return (
    <img
      src={"/images/logo/home.png"}
      alt={"Welcome to webgam"}
      className={styles.logo}
    />
  );
};

export default Logo;

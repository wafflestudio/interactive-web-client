import React from "react";
import styles from "./HomePage.module.scss";

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

import Link from "next/link";
import React, { useState } from "react";
import MoreIcon from "../../assets/svgs/MoreIcon";
import styles from "./HomePage.module.scss";
import { router } from "next/client";

// 홈 헤더

const HomeHeader = ({
  setIsSidebar,
}: {
  setIsSidebar: (bool: boolean) => void;
}) => {
  return (
    <header className={styles.homeHeader}>
      <button
        className={styles.moreButton}
        onClick={() => {
          setIsSidebar(true);
        }}
      >
        <MoreIcon />
      </button>
      <div className={styles.user}>
        <div className={`${styles.signButtons} sign-font`}>
          <button className={`${styles.signin}`}>
            <Link href={"/login"}>
              <a>로그인</a>
            </Link>
          </button>
          |
          <button className={`${styles.signup}`}>
            <Link href={"/signup"}>회원가입</Link>
          </button>
        </div>
        <div
          className={styles.profile}
          onClick={async () => {
            await router.push("/user");
          }}
        />
      </div>
    </header>
  );
};

export default HomeHeader;

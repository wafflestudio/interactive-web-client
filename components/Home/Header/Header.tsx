import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import MoreIcon from "../../../assets/svgs/MoreIcon";
import styles from "./Header.module.scss";

// 홈 헤더

const Header = ({
  setIsSidebar,
}: {
  setIsSidebar: (bool: boolean) => void;
}) => {
  const router = useRouter();

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
            <Link href={"/login"}>로그인</Link>
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

export default Header;

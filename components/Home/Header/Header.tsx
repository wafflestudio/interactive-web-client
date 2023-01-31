import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import MoreIcon from "../../../assets/svgs/MoreIcon";
import styles from "./Header.module.scss";

const Header = ({
  setIsSidebar,
}: {
  setIsSidebar: (bool: boolean) => void;
}) => {
  const router = useRouter();

  return (
    <header className={styles.homeHeader}>
      <button className={styles.moreButton} onClick={() => setIsSidebar(true)}>
        <MoreIcon />
      </button>
      <div className={styles.user}>
        <div className={`${styles.signButtons} sign-font`}>
          <button className={styles.signIn}>
            <Link href={"/login"}>
              <a>로그인</a>
            </Link>
          </button>
          |
          <button className={styles.signUp}>
            <Link href={"/signup"}>회원가입</Link>
          </button>
        </div>
        <div
          className={styles.profile}
          onClick={async () => await router.push("/user")}
        />
      </div>
    </header>
  );
};

export default Header;

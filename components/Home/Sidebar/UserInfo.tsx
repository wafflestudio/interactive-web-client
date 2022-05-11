import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../../../modules";
import styles from "./SideBar.module.scss";

export default function UserInfo() {
  const { username, isLoggedIn } = useSelector(
    (state: RootState) => state.user,
  );
  return (
    <>
      {!isLoggedIn ? (
        <div>
          <button>
            <Link href={"/signup"}>
              <a>회원가입</a>
            </Link>
          </button>
          <button>
            <Link href={"/login"}>
              <a>로그인</a>
            </Link>
          </button>
        </div>
      ) : (
        <div className={styles.userProfile}>
          <div className={styles.profileImage} />
          <div className={styles.userInfo}>
            <div className={styles.userName}>{username}</div>
          </div>
          <button className={styles.toUser}>
            <Link href={"/user"}>
              <a>내 정보</a>
            </Link>
          </button>
        </div>
      )}
    </>
  );
}

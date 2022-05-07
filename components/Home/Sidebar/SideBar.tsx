import Link from "next/link";
import Navigator from "./Navigator";
import UserInfo from "./UserInfo";
import styles from "./SideBar.module.scss";

export default function SideBar() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link href="/">로고</Link>
      </div>
      <UserInfo />
      <Navigator />
    </div>
  );
}

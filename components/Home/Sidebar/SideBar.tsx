import Navigator from './Navigator'
import UserInfo from './UserInfo'
import styles from './SideBar.module.scss'

export default function SideBar() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>로고</div>
      <UserInfo />
      <Navigator />
    </div>
  )
}

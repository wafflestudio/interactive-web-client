import HomeMain from './Main/HomeMain'
import PageHead from './PageHead'
import SideBar from './Sidebar/SideBar'
import styles from './HomePage.module.scss'

export default function HomePage() {
  return (
    <>
      <PageHead />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <SideBar />
          <HomeMain />
        </div>
      </div>
    </>
  )
}

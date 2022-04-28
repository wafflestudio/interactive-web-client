import PageHead from './PageHead'
import SideBar from './SideBar'
import styles from './HomePage.module.scss'

export default function HomePage() {
  return (
    <>
      <PageHead />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <SideBar />
        </div>
      </div>
    </>
  )
}

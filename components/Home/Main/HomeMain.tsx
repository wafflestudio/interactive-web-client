import {categoryList} from '../../../constants/constants'
import CommunityPage from './CommunityPage/CommunityPage'
import Notice from './Notice/Notice'
import styles from './HomeMain.module.scss'

export default function HomeMain() {
  return (
    <div className={styles.container}>
      <Notice />
      {categoryList.map((category) => {
        return <CommunityPage key={category.id} category={category} />
      })}
    </div>
  )
}

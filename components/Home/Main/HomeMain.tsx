import CommunityPage from './CommunityPage/CommunityPage'
import Notice from './Notice/Notice'
import styles from './HomeMain.module.scss'

export default function HomeMain() {
  const categoryList = [
    {id: 0, name: '샘플 페이지'},
    {id: 1, name: 'NEW!'},
    {id: 2, name: '지금 핫한 페이지'}
  ]

  return (
    <div className={styles.container}>
      <Notice />
      {categoryList.map((category) => {
        return <CommunityPage key={category.id} category={category.name} />
      })}
    </div>
  )
}

import Link from 'next/link'
import {useSelector} from 'react-redux'
import {categoryList} from '../../../constants/constants'
import {RootState} from '../../../modules'
import styles from './SideBar.module.scss'

export default function Navigator() {
  const {isLoggedIn} = useSelector((state: RootState) => state.user)

  return (
    <nav className={styles.navigator}>
      <ul>
        <ul className={styles.community}>
          커뮤니티
          {categoryList.map((category) => {
            return (
              <li key={category.id}>
                <Link href={`/works/${category.path}`}>
                  <a>{category.navigator}</a>
                </Link>
              </li>
            )
          })}
        </ul>
        {isLoggedIn ? (
          <li>
            <Link href={'/works/me'}>내 작업물</Link>
          </li>
        ) : null}
      </ul>
    </nav>
  )
}

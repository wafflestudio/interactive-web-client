import Link from 'next/link'
import styles from './SideBar.module.scss'

export default function Navigator() {
  return (
    <nav className={styles.navigator}>
      <ul>
        <ul className={styles.community}>
          커뮤니티
          <li>
            <Link href={'/works/sample'}>샘플 페이지</Link>
          </li>
          <li>
            <Link href={'/works/new'}>신규 페이지</Link>
          </li>
          <li>
            <Link href={'/works/hot'}>핫한 페이지</Link>
          </li>
        </ul>
        <li>
          <Link href={'/works/me'}>내 작업물</Link>
        </li>
      </ul>
    </nav>
  )
}

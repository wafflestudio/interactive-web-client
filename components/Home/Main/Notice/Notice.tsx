import Link from 'next/link'
import styles from './Notice.module.scss'

export default function Notice() {
  return (
    <div className={styles.container}>
      <Link href={'/notice'}>
        <a>
          <div className={styles.notice}>공지사항</div>
        </a>
      </Link>
    </div>
  )
}

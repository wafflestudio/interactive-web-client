import Link from 'next/link'
import {useRef} from 'react'
import styles from './CommunityPage.module.scss'

export default function CommunityPage({category}: {category: string}) {
  const pageListContainer = useRef<HTMLUListElement>(null)

  const pageList = [{id: 0}, {id: 1}, {id: 2}, {id: 3}, {id: 4}]

  const slide = (number: number) => {
    const {current} = pageListContainer
    if (current) {
      current.scrollLeft += number
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.categoryHeader}>
        <div>{category}</div>
        <button className={styles.moreButton}>
          <Link href={'/works'}>
            <a>더보기</a>
          </Link>
        </button>
      </div>
      <ul ref={pageListContainer} className={styles.pageList}>
        {pageList.map((page) => {
          return (
            <li key={page.id}>
              <Link href={`/works/${page.id}`}>
                <a>
                  <div></div>
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
      <button className={styles.slideLeft} onClick={() => slide(-100)}>
        &#60;
      </button>
      <button className={styles.slideRight} onClick={() => slide(100)}>
        &#62;
      </button>
    </div>
  )
}

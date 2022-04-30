import Link from 'next/link'
import {useSelector} from 'react-redux'
import {RootState} from '../../../modules'
import styles from './SideBar.module.scss'

export default function UserInfo() {
  const {isLoggedIn} = useSelector((state: RootState) => state.user)

  return (
    <>
      {!isLoggedIn ? (
        <div>
          <button>
            <Link href={'/signup'}>
              <a>회원가입</a>
            </Link>
          </button>
          <button>
            <Link href={'/login'}>
              <a>로그인</a>
            </Link>
          </button>
        </div>
      ) : (
        <div className={styles.userProfile}>
          <div className={styles.profileImage} />
          <div className={styles.userInfo}>로그인 정보</div>
        </div>
      )}
    </>
  )
}

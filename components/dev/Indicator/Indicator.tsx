import {useSelector} from 'react-redux'

import {RootState} from '../../../modules'

import styles from './Indicator.module.scss'

//canvas 상에서 선택 된 object의 위치가 제대로 추적되고 있음을 보이기 위해 추가했습니다

const Indicator = () => {
  const dragTarget = useSelector((state: RootState) => {
    return state.drag.target
  })
  return (
    <div className={styles.indicator}>
      <div>drag X : {dragTarget.x}</div>
      <div>drag Y : {dragTarget.y}</div>
    </div>
  )
}

export default Indicator

import {useSelector} from 'react-redux'

import {RootState} from '../../../modules'

import styles from './Indicator.module.scss'

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

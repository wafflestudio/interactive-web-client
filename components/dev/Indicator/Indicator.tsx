import {useDispatch, useSelector} from 'react-redux'

import {RootState} from '../../../modules'

import {setTestType} from '../../../modules/testType'
import styles from './Indicator.module.scss'

//canvas 상에서 선택 된 object의 위치가 제대로 추적되고 있음을 보이기 위해 추가했습니다

const Indicator = () => {
  const dispatch = useDispatch()
  const testTypeNumber = useSelector((state: RootState) => state.testType)
  const dragTarget = useSelector((state: RootState) => {
    return state.drag.target
  })
  const changeType = (num: number) => {
    dispatch(setTestType(num))
  }
  return (
    <div className={styles.indicator}>
      <div>[ Change render mode ]</div>
      <br />
      <div className={styles.buttons}>
        <div
          className={styles.buttonDiv}
          onClick={() => {
            changeType(0)
          }}
        >
          1
        </div>
        <div
          className={styles.buttonDiv}
          onClick={() => {
            changeType(1)
          }}
        >
          2
        </div>
        <div
          className={styles.buttonDiv}
          onClick={() => {
            changeType(2)
          }}
        >
          3
        </div>
      </div>
      <div>
        mode : {testTypeNumber === 0 && 'plain canvas'}
        {testTypeNumber === 1 && 'three.js'}
        {testTypeNumber === 2 && 'WebGL'}
      </div>
      <div>drag X : {dragTarget.x}</div>
      <div>drag Y : {dragTarget.y}</div>
    </div>
  )
}

export default Indicator

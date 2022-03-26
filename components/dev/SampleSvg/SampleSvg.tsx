import {batch, useDispatch} from 'react-redux'

import {ObjectDataType} from '../../../dummies/dummyInterface'
import {startDrag} from '../../../modules/drag'
import {updateObject} from '../../../modules/objects'

import styles from './SampleSvg.module.scss'

interface SampleSvgProps {
  key: number
  item: ObjectDataType
}

//objects에 저장된 데이터를 바탕으로 svg 엘리먼트를 만들어 렌더합니다

const SampleSvg = ({item}: SampleSvgProps) => {
  const dispatch = useDispatch()
  const style = {
    width: item.svgData.width,
    height: item.svgData.height,
    left: item.x,
    top: item.y
  }

  return (
    <svg
      className={`${styles.sampleSvg} ${item.isVisible ? `` : styles.off}`}
      style={style}
    >
      <rect
        width={`${item.svgData.width}px`}
        height={`${item.svgData.height}px`}
        fill={item.svgData.fill}
        onMouseDown={(e) => {
          batch(() => {
            dispatch(updateObject({...item, isVisible: false}))
            dispatch(
              startDrag(item, e.nativeEvent.offsetX, e.nativeEvent.offsetY)
            )
          })
        }}
      />
    </svg>
  )
}

export default SampleSvg

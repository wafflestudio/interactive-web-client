import {batch, useDispatch} from 'react-redux'

import {ObjectDataType} from '../../../dummies/dummyInterface'
import {startDrag} from '../../../modules/drag'
import {updateObject} from '../../../modules/objects'

import styles from './SampleSvg.module.scss'

interface SampleSvgProps {
  key: number
  item: ObjectDataType
}

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
            dispatch(startDrag(item))
          })
        }}
      />
    </svg>
  )
}

export default SampleSvg

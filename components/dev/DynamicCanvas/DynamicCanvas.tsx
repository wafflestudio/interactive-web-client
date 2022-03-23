import {useRef} from 'react'
import {batch, useDispatch, useSelector} from 'react-redux'

import {RootState} from '../../../modules'
import {endDrag, moveDrag} from '../../../modules/drag'
import {updateObject} from '../../../modules/objects'

import styles from './DynamicCanvas.module.scss'

//드래그 중의 프리뷰 개체가 표시될 canvas 컴포넌트입니다

const DynamicCanvas = () => {
  const dispatch = useDispatch()
  const dragTarget = useSelector((state: RootState) => state.drag.target)
  const isDragOn = useSelector((state: RootState) => state.drag.isOn)

  return (
    <canvas
      className={`${styles.dynamicCanvas} ${isDragOn ? '' : styles.off}`}
      onMouseMove={(e) => {
        dispatch(moveDrag(e.nativeEvent.movementX, e.nativeEvent.movementY))
      }}
      onMouseUp={(e) => {
        batch(() => {
          if (dragTarget) {
            dispatch(updateObject(dragTarget))
          }
          dispatch(endDrag())
        })
      }}
    />
  )
}

export default DynamicCanvas

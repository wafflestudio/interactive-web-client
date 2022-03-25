import {Canvas, useFrame} from '@react-three/fiber'
import {useEffect, useRef} from 'react'
import {batch, useDispatch, useSelector} from 'react-redux'

import {RootState} from '../../../modules'
import {endDrag, moveDrag} from '../../../modules/drag'
import {updateObject} from '../../../modules/objects'
import {drawRect} from './previews/canvasRect'
import {RectMesh} from './RectMesh'

import styles from './DynamicCanvas.module.scss'

const DynamicCanvas = () => {
  const dispatch = useDispatch()
  const dragTarget = useSelector((state: RootState) => state.drag.target)
  const objects = useSelector((state: RootState) => {
    return state.objects
  })
  const fixedObjs = objects.filter((object) => object.id != dragTarget.id)
  const isDragOn = useSelector((state: RootState) => state.drag.isOn)
  // const canvasRef = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const testTypeNumber = useSelector((state: RootState) => state.testType)

  useEffect(() => {
    if (canvas.current !== null) {
      canvas.current.width = canvas.current.clientWidth
      canvas.current.height = canvas.current.clientHeight
    }
  })

  useEffect(() => {
    if (canvas.current !== null) {
      const ctx = canvas.current.getContext('2d')
      if (isDragOn && ctx) {
        drawRect(ctx, {
          x: dragTarget.x,
          y: dragTarget.y,
          w: dragTarget.svgData.width,
          h: dragTarget.svgData.height
        })
      }
    }
  }, [dragTarget])

  return (
    <div
      // ref={canvasRef}
      className={`${styles.dynamicCanvas} ${isDragOn ? `` : styles.off}`}
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
    >
      {/*<Canvas camera={{position: [0, 0, 10]}}>*/}
      {/*  <RectMesh*/}
      {/*    fixedObjs={fixedObjs}*/}
      {/*    dragTarget={dragTarget}*/}
      {/*    canvasSize={*/}
      {/*      canvasRef.current*/}
      {/*        ? {*/}
      {/*            width: canvasRef.current.clientWidth,*/}
      {/*            height: canvasRef.current.clientHeight*/}
      {/*          }*/}
      {/*        : undefined*/}
      {/*    }*/}
      {/*  />*/}
      {/*</Canvas>*/}

      {testTypeNumber === 0 && <canvas ref={canvas}></canvas>}
    </div>
  )
}

export default DynamicCanvas

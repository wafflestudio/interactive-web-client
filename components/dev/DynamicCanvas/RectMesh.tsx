import {useFrame, useThree} from '@react-three/fiber'
import {useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {ObjectDataType} from '../../../dummies/dummyInterface'
import {updateObject} from '../../../modules/objects'

type RectMeshProps = {
  fixedObjs: ObjectDataType[]
  dragTarget: ObjectDataType
  canvasSize?: {width: number; height: number}
}

const getDistance = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => {
  const xDistance = x2 - x1
  const yDistance = y2 - y1

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
}

export const RectMesh = ({
  fixedObjs,
  dragTarget,
  canvasSize
}: RectMeshProps) => {
  // const dispatch = useDispatch()
  const meshRef = useRef<JSX.IntrinsicElements['mesh']>(null)
  const {viewport} = useThree()

  useFrame(({mouse}) => {
    if (meshRef !== null) {
      if (meshRef.current?.position && canvasSize) {
        const x = (dragTarget.x / canvasSize.width - 0.5) * viewport.width
        const y = (0.5 - dragTarget.y / canvasSize.height) * viewport.height
        meshRef.current.position.set(x, y, 0)
        meshRef.current.rotateX(-0.1)
        meshRef.current.rotateY(0.1)

        for (let i = 0; i < fixedObjs.length; i++) {
          const obj = fixedObjs[i]
          if (
            getDistance(dragTarget.x, dragTarget.y, obj.x, obj.y) <
            dragTarget.svgData.width + obj.svgData.width
          ) {
            // 고정된 오브젝트들 위치 변경
            // dispatch(
            //   updateObject({...obj, svgData: {...obj.svgData, fill: '#ff8080'}})
            // )
          }
        }
      }
    }
  })

  if (!dragTarget.svgData?.fill) {
    return <></>
  }

  return (
    <mesh ref={meshRef}>
      <boxBufferGeometry args={[0.5, 0.5, 0.5]} />
      <meshBasicMaterial color={dragTarget.svgData.fill} />
    </mesh>
  )
}

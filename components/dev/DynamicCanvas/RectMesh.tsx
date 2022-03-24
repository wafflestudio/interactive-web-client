import {useEffect, useRef} from 'react'
import {useFrame, useThree} from '@react-three/fiber'
import {ObjectDataType} from '../../../dummies/dummyInterface'
import * as THREE from 'three'

type RectMeshProps = {
  dragTarget: ObjectDataType
  canvasSize?: {width: number; height: number}
}

export const RectMesh = ({dragTarget, canvasSize}: RectMeshProps) => {
  const meshRef = useRef<JSX.IntrinsicElements['mesh']>(null)
  const {viewport} = useThree()

  useFrame(({mouse}) => {
    if (meshRef.current?.position && canvasSize) {
      const x = (dragTarget.x / canvasSize.width - 0.5) * viewport.width
      const y = (0.5 - dragTarget.y / canvasSize.height) * viewport.height
      meshRef.current.position.set(x, y, 0)
      meshRef.current.rotateX(-0.1)
      meshRef.current.rotateY(0.1)
    }
  })

  if (!dragTarget.svgData?.fill) {
    return <></>
  }

  return (
    <mesh ref={meshRef}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={dragTarget.svgData.fill} />
    </mesh>
  )
}

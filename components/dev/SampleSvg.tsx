import {ObjectDataType} from '../../dummies/dummyInterface'

import styles from './SampleSvg.module.scss'

interface SampleSvgProps {
  key: number
  item: ObjectDataType
}

const SampleSvg = ({item}: SampleSvgProps) => {
  const style = {
    width: item.svgData.width,
    height: item.svgData.height,
    left: item.x,
    top: item.y
  }
  return (
    <svg className={styles.sampleSvg} style={style}>
      <rect
        width={`${item.svgData.width}px`}
        height={`${item.svgData.height}px`}
        fill={item.svgData.fill}
      />
    </svg>
  )
}

export default SampleSvg

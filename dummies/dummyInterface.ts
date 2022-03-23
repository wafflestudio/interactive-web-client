// svg 개체의 종류와 크기, 색상을 결정하는 데이터입니다
export interface SvgDataType {
  svgType: string
  width?: number
  height?: number
  fill?: string
  stroke?: string
}

// 각 오브젝트들의 비주얼 데이터(svgData), 아이디, 좌표값(좌상단의), 보이는 지 여부를 담은 데이터입니다
export interface ObjectDataType {
  id: number
  svgData: SvgDataType
  x: number
  y: number
  isVisible: boolean
}

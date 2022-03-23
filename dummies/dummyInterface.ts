export interface SvgDataType {
  svgType: string
  width?: number
  height?: number
  fill?: string
  stroke?: string
}

export interface ObjectDataType {
  id: number
  svgData: SvgDataType
  x: number
  y: number
  isVisible: boolean
  // element: HTMLCollection | any
}

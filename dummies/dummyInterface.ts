// svg 개체의 종류와 크기, 색상을 결정하는 데이터입니다
export interface SvgDataType {
  svgType: string;
  fill?: string;
  stroke?: string;
  src?: string;
}

export interface divDataType {
  divType: string;
  fill?: string;
  stroke: string;
  src?: string;
}

export interface GeometryType {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ObjectDataType {
  id: number;
  svgData: SvgDataType;
  geometry: GeometryType;
  visibility: boolean;
}

export interface AreaDataType {
  id: number;
  divData: divDataType;
  geometry: GeometryType;
  visibility: boolean;
}

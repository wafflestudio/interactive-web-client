// svg 개체의 종류와 크기, 색상을 결정하는 데이터입니다
export interface SvgDataType {
  //drawing은 우리가 에디터에서 직접 그린 오브젝트 (충돌 영역 표시 등)
  svgType: "rect" | "ellipse" | "path" | "drawing" | "image" | "text";
  fill?: string;
  stroke?: string;
  d?: string;
  src?: string;
  file?: File;
}

export interface DivDataType {
  divType: string;
  fill?: string;
  stroke?: string;
  src?: string;
}

export interface GeometryType {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ObjectDataType {
  id: number; //중복 없게
  name: string;
  svgData: SvgDataType;
  geometry: GeometryType;
  attribute?: object;
  tag: string[];
  visibility: boolean;
  zIndex?: number;
}

//이게 필요한가?
export interface TextboxDataType {
  id: number;
  divData: DivDataType;
  geometry: GeometryType;
  innerText: string;
  visibility: boolean;
  zIndex?: number;
}

export interface AreaDataType {
  id: number;
  divData: DivDataType;
  geometry: GeometryType;
  visibility: boolean;
  zIndex?: number;
}

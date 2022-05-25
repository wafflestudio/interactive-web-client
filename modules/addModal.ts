import { ObjectDataType } from "../dummies/dummyInterface";

export const SET_NAME = "addModal/SET_NAME" as const;
export const SET_SHAPE = "addModal/SET_SHAPE" as const;
export const SET_WIDTH = "addModal/SET_WIDTH" as const;
export const SET_HEIGHT = "addModal/SET_HEIGHT" as const;
export const SET_IMAGE = "addModal/SET_IMAGE" as const;
export const SET_TAGS = "addModal/SET_TAGS" as const;
export const SET_STROKE = "addModal/SET_STROKE" as const;
export const SET_FILL = "addModal/SET_FILL" as const;
export const INITIALIZE = "addModal/INITIALIZE" as const;

export const setName = (name: string) => ({
  type: SET_NAME,
  payload: name,
});

export const setShape = (
  shape: "rect" | "ellipse" | "path" | "drawing" | "image" | "text",
) => ({
  type: SET_SHAPE,
  payload: shape,
});

export const setWidth = (width: number) => ({
  type: SET_WIDTH,
  payload: width,
});

export const setHeight = (height: number) => ({
  type: SET_HEIGHT,
  payload: height,
});

export const setImage = (image: File) => ({
  type: SET_IMAGE,
  payload: image,
});

export const setTags = (tag: string[]) => ({
  type: SET_TAGS,
  payload: tag,
});

export const setStroke = (stroke: string) => ({
  type: SET_STROKE,
  payload: stroke,
});

export const setFill = (fill: string) => ({
  type: SET_FILL,
  payload: fill,
});

export const initialize = () => ({
  type: INITIALIZE,
});

type AddModalAction =
  | ReturnType<typeof setName>
  | ReturnType<typeof setShape>
  | ReturnType<typeof setWidth>
  | ReturnType<typeof setHeight>
  | ReturnType<typeof setImage>
  | ReturnType<typeof setTags>
  | ReturnType<typeof setStroke>
  | ReturnType<typeof setFill>
  | ReturnType<typeof initialize>;

const initialState: ObjectDataType = {
  id: 100,
  name: "",
  svgData: { svgType: "rect", stroke: "#000000", fill: "#ffffff" },
  geometry: { x: 0, y: 0, w: 50, h: 50 },
  attribute: {} as object,
  tag: [],
  visibility: true,
};

const addModal = (
  state: ObjectDataType = initialState,
  action: AddModalAction,
): ObjectDataType => {
  switch (action.type) {
    case SET_NAME:
      return { ...state, name: action.payload };
    case SET_SHAPE:
      return {
        ...state,
        svgData: { ...state.svgData, svgType: action.payload },
      };
    case SET_WIDTH:
      return { ...state, geometry: { ...state.geometry, w: action.payload } };
    case SET_HEIGHT:
      return { ...state, geometry: { ...state.geometry, h: action.payload } };
    case SET_IMAGE:
      return { ...state, svgData: { ...state.svgData, file: action.payload } };
    case SET_TAGS:
      return { ...state, tag: action.payload };
    case SET_STROKE:
      return {
        ...state,
        svgData: { ...state.svgData, stroke: action.payload },
      };
    case SET_FILL:
      return { ...state, svgData: { ...state.svgData, fill: action.payload } };
    case INITIALIZE:
      return initialState;
    default:
      return state;
  }
};

export default addModal;

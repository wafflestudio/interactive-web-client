import {
  GeometryType,
  PixiDataType,
  SvgDataType,
} from "../dummies/dummyInterface";

export const ADD_PIXI = "pixiGraphics/ADD_PIXI" as const;
export const UPDATE_PIXI = "pixiGraphics/UPDATE_PIXI" as const;
export const DELETE_PIXI = "pixiGraphics/DELETE_PIXI" as const;

export const addPixi = (pixi: PixiDataType) => ({
  type: ADD_PIXI,
  payload: pixi,
});

export const updatePixi = (
  id: number,
  data: { g: GeometryType; s: SvgDataType },
) => ({
  type: UPDATE_PIXI,
  payload: { id, data },
});

export const deletePixi = (id: number) => ({
  type: DELETE_PIXI,
  payload: id,
});

type PixiGraphicsAction =
  | ReturnType<typeof addPixi>
  | ReturnType<typeof updatePixi>
  | ReturnType<typeof deletePixi>;

const initialState: PixiDataType[] = [
  {
    id: Math.random(),
    geometry: { x: 100, y: 100, w: 100, h: 50 },
    svgData: { svgType: "rect" },
    animation: (tick, geometry: GeometryType, svgData: SvgDataType) => {
      geometry.x += 10;
      console.log(tick);
      return { geometry, svgData };
    },
  },
];

const pixiGraphics = (
  state: PixiDataType[] = initialState,
  action: PixiGraphicsAction,
): PixiDataType[] => {
  switch (action.type) {
    case ADD_PIXI:
      return [...state, action.payload];
    case UPDATE_PIXI:
      return state.map((item) => {
        const payload: {
          id: number;
          data: { g: GeometryType; s: SvgDataType };
        } = action.payload;
        if (item.id === payload.id) {
          return { ...item, geometry: payload.data.g, svgData: payload.data.s };
        }
        return item;
      });
    default:
      return state;
  }
};

export default pixiGraphics;

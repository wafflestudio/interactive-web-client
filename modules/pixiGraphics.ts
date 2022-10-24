import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  GeometryType,
  PixiDataType,
  SvgDataType,
} from "../dummies/dummyInterface";

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

const pixiGraphicsSlice = createSlice({
  name: "pixiGraphics",
  initialState,
  reducers: {
    addPixi: (state, action: PayloadAction<PixiDataType>) => [
      ...state,
      action.payload,
    ],
    updatePixi: (
      state,
      action: PayloadAction<{
        id: number;
        data: { g: GeometryType; s: SvgDataType };
      }>,
    ) =>
      state.map((item) => {
        const payload: {
          id: number;
          data: { g: GeometryType; s: SvgDataType };
        } = action.payload;
        if (item.id === payload.id) {
          return { ...item, geometry: payload.data.g, svgData: payload.data.s };
        }
        return item;
      }),
  },
});

export const { addPixi, updatePixi } = pixiGraphicsSlice.actions;
export default pixiGraphicsSlice.reducer;

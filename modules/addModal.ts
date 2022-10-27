import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ObjectDataType } from "../dummies/dummyInterface";

const initialState: ObjectDataType = {
  id: 99,
  name: "",
  svgData: { svgType: "rect", stroke: "#000000", fill: "#ffffff" },
  geometry: { x: 0, y: 0, w: 150, h: 150 },
  attribute: {} as object,
  tag: [],
  visibility: true,
  zIndex: 99,
};

type ShapeType = "rect" | "ellipse" | "path" | "drawing" | "image" | "text";

const addModalSlice = createSlice({
  name: "addModal",
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setShape: (state, action: PayloadAction<ShapeType>) => {
      state.svgData.svgType = action.payload;
    },
    setWidth: (state, action: PayloadAction<number>) => {
      state.geometry.w = action.payload;
    },
    setHeight: (state, action: PayloadAction<number>) => {
      state.geometry.h = action.payload;
    },
    setXPos: (state, action: PayloadAction<number>) => {
      state.geometry.x = action.payload;
    },
    setYPos: (state, action: PayloadAction<number>) => {
      state.geometry.y = action.payload;
    },
    setImage: (state, action: PayloadAction<File | undefined>) => {
      state.svgData.file = action.payload;
    },
    setSrc: (state, action: PayloadAction<string>) => {
      state.svgData.src = action.payload;
    },
    setTags: (state, action: PayloadAction<string[]>) => {
      state.tag = action.payload;
    },
    setStroke: (state, action: PayloadAction<string>) => {
      state.svgData.stroke = action.payload;
    },
    setFill: (state, action: PayloadAction<string>) => {
      state.svgData.fill = action.payload;
    },
  },
});

export const {
  setId,
  setName,
  setShape,
  setWidth,
  setHeight,
  setXPos,
  setYPos,
  setImage,
  setSrc,
  setTags,
  setStroke,
  setFill,
} = addModalSlice.actions;
export default addModalSlice.reducer;

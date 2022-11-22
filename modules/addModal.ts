import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ObjectDataType } from "../types/types";

const initialState: ObjectDataType = {
  object_name: "",
  tag: JSON.stringify({
    size: "3",
    "0": "string",
    "1": "array",
    "2": "test",
    test: "success",
  }),
  visibility: true,
  z_index: 1,
  opacity: 1,
  src_url: "https://webgam.com/dummy-image-source-url",
  x: 0,
  y: 0,
  h: 0,
  w: 0,
  image: null,
};

const addModalSlice = createSlice({
  name: "addModal",
  initialState,
  reducers: {
    initialize: () => initialState,
    setName: (state, action: PayloadAction<string>) => {
      state.object_name = action.payload;
    },
    setWidth: (state, action: PayloadAction<number>) => {
      state.w = action.payload;
    },
    setHeight: (state, action: PayloadAction<number>) => {
      state.h = action.payload;
    },
    setXPos: (state, action: PayloadAction<number>) => {
      state.x = action.payload;
    },
    setYPos: (state, action: PayloadAction<number>) => {
      state.y = action.payload;
    },
    setImage: (state, action: PayloadAction<File | null>) => {
      state.image = action.payload;
    },
    setSrc: (state, action: PayloadAction<string>) => {
      state.src_url = action.payload;
    },
    setTags: (state, action: PayloadAction<JSON>) => {
      state.tag = action.payload;
    },
  },
});

export const {
  initialize,
  setName,
  setWidth,
  setHeight,
  setXPos,
  setYPos,
  setImage,
  setSrc,
  setTags,
} = addModalSlice.actions;
export default addModalSlice.reducer;

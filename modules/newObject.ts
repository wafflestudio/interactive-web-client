import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITextObject } from "../types/base";

const initialState: { current: ITextObject } = {
  current: {
    id: 0,
    type: "text",
    name: "",
    isInteractive: false,
    positionX: 100,
    positionY: 100,
    width: 100,
    height: 100,
    zIndex: 1,
    opacity: 100,
    textContent: "",
    fontSize: 18,
  },
};

const newObjectSlice = createSlice({
  name: "newObject",
  initialState,
  reducers: {
    setObject: (state, action: PayloadAction<ITextObject>) => {
      state.current = action.payload;
    },
  },
});

export const { setObject } = newObjectSlice.actions;

export default newObjectSlice.reducer;

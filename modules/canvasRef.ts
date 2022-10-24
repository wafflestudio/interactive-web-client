import { Application } from "@pixi/app";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { bool } from "prop-types";
import { RefObject } from "react";

interface canvasRefStateType {
  ref: Application | null;
  exist?: boolean;
}

const initialState: canvasRefStateType = { ref: null };

const canvasRefSlice = createSlice({
  name: "canvasRef",
  initialState,
  reducers: {
    saveCanvasRef: (state, action: PayloadAction<Application>) => {
      return { ...state, ref: action.payload };
    },
    toggleCanvasRef: (state, action: PayloadAction<boolean>) => {
      state.exist = action.payload;
    },
    renderCanvasRef: (state) => {
      return state;
    },
  },
});

export const { saveCanvasRef, toggleCanvasRef, renderCanvasRef } =
  canvasRefSlice.actions;
export default canvasRefSlice.reducer;

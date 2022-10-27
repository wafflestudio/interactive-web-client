import { Property } from "csstype";
import { ObjectDataType } from "../dummies/dummyInterface";
import {
  CollisionAnimation,
  GridSlideAnimation,
} from "../functions/animation/animationInterface";
import { friction } from "../functions/animation/environment";
import Grid = Property.Grid;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AnimateState {
  gridSlideArr: GridSlideAnimation[];
  collisionArr: CollisionAnimation[];
}

const initialState: AnimateState = {
  gridSlideArr: [],
  collisionArr: [],
};

const animateSlice = createSlice({
  name: "animate",
  initialState,
  reducers: {
    addAnimateGridSlide: (state, action: PayloadAction<GridSlideAnimation>) => {
      state.gridSlideArr = [...state.gridSlideArr, action.payload];
    },
    addAnimateCollision: (state, action: PayloadAction<CollisionAnimation>) => {
      state.collisionArr = [...state.collisionArr, action.payload];
    },
    updateTargetGridSlide: (
      state,
      action: PayloadAction<GridSlideAnimation>,
    ) => {
      return state;
    },
    updateTargetCollision: (
      state,
      action: PayloadAction<CollisionAnimation>,
    ) => {
      state.collisionArr = state.collisionArr.map((animation) => {
        if (animation.target.id !== action.payload.target.id) {
          return animation;
        } else {
          return action.payload;
        }
      });
    },
    removeAnimateGridSLide: (state, action: PayloadAction<ObjectDataType>) => {
      state.gridSlideArr = state.gridSlideArr.filter(
        (animation) => animation.target.id !== action.payload.id,
      );
    },
    removeAnimateCollision: (state, action: PayloadAction<ObjectDataType>) => {
      state.collisionArr = state.collisionArr.filter(
        (animation) => animation.target.id !== action.payload.id,
      );
    },
  },
});

export const {
  addAnimateCollision,
  addAnimateGridSlide,
  updateTargetCollision,
  updateTargetGridSlide,
  removeAnimateCollision,
  removeAnimateGridSLide,
} = animateSlice.actions;
export default animateSlice.reducer;

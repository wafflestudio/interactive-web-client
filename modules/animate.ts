import { ObjectDataType } from "../dummies/dummyInterface";
import {
  CollisionAnimation,
  GridSlideAnimation,
} from "../functions/animation/animationInterface";
import { Property } from "csstype";
import { friction } from "../functions/animation/environment";
import Grid = Property.Grid;

const ADD_ANIMATE_GRID_SLIDE = "animate/ADD_ANIMATE_GRID_SLIDE" as const;
const ADD_ANIMATE_COLLISION = "animate/ADD_ANIMATE_COLLISION" as const;
const UPDATE_TARGET_GRID_SLIDE = "animate/UPDATE_TARGET_GRID_SLIDE" as const;
const UPDATE_TARGET_COLLISION = "animate/UPDATE_TARGET_COLLISION" as const;
const REMOVE_ANIMATE_GRID_SLIDE = "animate/REMOVE_ANIMATE_GRID_SLIDE" as const;
const REMOVE_ANIMATE_COLLISION = "animate/REMOVE_ANIMATE_COLLISION" as const;

interface AnimateState {
  gridSlideArr: GridSlideAnimation[];
  collisionArr: CollisionAnimation[];
}

const initialState: AnimateState = {
  gridSlideArr: [],
  collisionArr: [],
};

export const addAnimateGridSlide = (animation: GridSlideAnimation) => ({
  type: ADD_ANIMATE_GRID_SLIDE,
  payload: animation,
});

export const addAnimateCollision = (animation: CollisionAnimation) => ({
  type: ADD_ANIMATE_COLLISION,
  payload: animation,
});

export const updateTargetGridSlide = (animation: GridSlideAnimation) => ({
  type: UPDATE_TARGET_GRID_SLIDE,
  payload: animation,
});

export const updateTargetCollision = (animation: CollisionAnimation) => ({
  type: UPDATE_TARGET_COLLISION,
  payload: animation,
});

export const removeAnimateGridSLide = (target: ObjectDataType) => ({
  type: REMOVE_ANIMATE_GRID_SLIDE,
  payload: target,
});

export const removeAnimateCollision = (target: ObjectDataType) => ({
  type: REMOVE_ANIMATE_COLLISION,
  payload: target,
});

type AnimateAction =
  | ReturnType<typeof addAnimateGridSlide>
  | ReturnType<typeof addAnimateCollision>
  | ReturnType<typeof updateTargetGridSlide>
  | ReturnType<typeof updateTargetCollision>
  | ReturnType<typeof removeAnimateGridSLide>
  | ReturnType<typeof removeAnimateCollision>;

const animate = (
  state: AnimateState = initialState,
  action: AnimateAction,
): AnimateState => {
  switch (action.type) {
    case ADD_ANIMATE_GRID_SLIDE:
      return {
        ...state,
        gridSlideArr: [...state.gridSlideArr, action.payload],
      };

    case ADD_ANIMATE_COLLISION:
      return {
        ...state,
        collisionArr: [...state.collisionArr, action.payload],
      };

    case UPDATE_TARGET_GRID_SLIDE:
      return state;

    case UPDATE_TARGET_COLLISION:
      return {
        ...state,
        collisionArr: state.collisionArr.map((animation) => {
          if (animation.target.id !== action.payload.target.id) {
            return animation;
          } else {
            return action.payload;
          }
        }),
      };

    case REMOVE_ANIMATE_GRID_SLIDE:
      return {
        ...state,
        gridSlideArr: state.gridSlideArr.filter(
          (animation) => animation.target.id !== action.payload.id,
        ),
      };

    case REMOVE_ANIMATE_COLLISION:
      return {
        ...state,
        collisionArr: state.collisionArr.filter(
          (animation) => animation.target.id !== action.payload.id,
        ),
      };

    default:
      return state;
  }
};

export default animate;

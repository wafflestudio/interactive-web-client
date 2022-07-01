import { ObjectDataType } from "../../dummies/dummyInterface";

export interface Animation {
  target: ObjectDataType;
}

export enum SLIDE_DIRECTION {
  UP = "up",
  DOWN = "down",
  RIGHT = "right",
  LEFT = "left",
}

export interface VECTOR_SPEED {
  x: number;
  y: number;
}

export interface SPEED_INFO extends VECTOR_SPEED {
  scalar: number;
}

export interface GridSlideAnimation extends Animation {
  direction: SLIDE_DIRECTION;
}

export interface CollisionAnimation extends Animation {
  vSpeed: SPEED_INFO;
}

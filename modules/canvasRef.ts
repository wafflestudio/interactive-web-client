import { bool } from "prop-types";
import { RefObject } from "react";

const TOGGLE_REF = "canvasRef/TOGGLE_REF" as const;
const SAVE_REF = "canvasRef/SAVE_REF" as const;
export const RENDER_REF = "canvasRef/RENDER_REF" as const;

export const saveCanvasRef = (ref: RefObject<HTMLCanvasElement>) => ({
  type: SAVE_REF,
  payload: ref,
});
export const toggleCanvasRef = (bool: boolean) => ({
  type: TOGGLE_REF,
  payload: bool,
});

export const renderCanvasRef = () => ({
  type: RENDER_REF,
});

type canvasRefActionType =
  | ReturnType<typeof toggleCanvasRef>
  | ReturnType<typeof saveCanvasRef>
  | ReturnType<typeof renderCanvasRef>;
interface canvasRefStateType {
  exist: boolean;
  ref?: RefObject<HTMLCanvasElement>;
}

const initialState: canvasRefStateType = { exist: false };

const canvasRef = (
  state: canvasRefStateType = initialState,
  action: canvasRefActionType,
) => {
  switch (action.type) {
    case SAVE_REF:
      return { ...state, ref: action.payload };
    case TOGGLE_REF:
      return { ...state, exist: action.payload};
    case RENDER_REF:
      return state;
    default:
      return state;
  }
};

export default canvasRef;

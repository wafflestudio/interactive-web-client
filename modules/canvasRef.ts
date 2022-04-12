import { RefObject } from "react";

const SAVE_REF = "canvasRef/SAVE_REF" as const;
export const RENDER_REF = "canvasRef/RENDER_REF" as const;
export const saveCanvasRef = (ref: RefObject<HTMLCanvasElement>) => ({
  type: SAVE_REF,
  payload: ref,
});

export const renderCanvasRef = () => ({
  type: RENDER_REF,
});

type canvasRefAction =
  | ReturnType<typeof saveCanvasRef>
  | ReturnType<typeof renderCanvasRef>;
interface stateType {
  isOn: boolean;
  ref?: RefObject<HTMLCanvasElement>;
}

const initialState: stateType = { isOn: false };

const canvasRef = (
  state: stateType = initialState,
  action: canvasRefAction,
) => {
  switch (action.type) {
    case SAVE_REF:
      return { ref: action.payload };
    case RENDER_REF:
      return state;
    default:
      return state;
  }
};

export default canvasRef;

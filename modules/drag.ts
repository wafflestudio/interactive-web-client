// 현재 움직이고 있는(mousedown된) 오브젝트(target)와 x, y 위치입니다.
// position에서 drag로 이름을 바꿨습니다

import { ObjectDataType } from "../dummies/dummyInterface";
import { InteractionDataType, MouseEventType } from "../types/types";

export const START_DRAG = "drag/START_DRAG" as const;
export const MOVE_DRAG = `drag/MOVE_DRAG` as const;
export const END_DRAG = "drag/END_DRAG" as const;

const emptyData = {} as InteractionDataType;
const emptyEvent = {} as MouseEventType;

interface DragState {
  isOn: boolean;
  data: InteractionDataType;
  event: MouseEventType;
}

export const startDrag = (
  event: MouseEventType,
  data: InteractionDataType,
) => ({
  type: START_DRAG,
  payload: { data, event },
});

export const moveDrag = (event: MouseEventType) => ({
  type: MOVE_DRAG,
  payload: { event },
});

export const endDrag = (event: MouseEventType) => ({
  type: END_DRAG,
  payload: { event },
});

type DragAction =
  | ReturnType<typeof startDrag>
  | ReturnType<typeof moveDrag>
  | ReturnType<typeof endDrag>;

const initialState: DragState = {
  isOn: false,
  data: emptyData,
  event: emptyEvent,
};

const drag = (
  state: DragState = initialState,
  action: DragAction,
): DragState => {
  switch (action.type) {
    case START_DRAG:
      return {
        isOn: true,
        data: action.payload.data,
        event: action.payload.event,
      };
    case MOVE_DRAG:
      return {
        ...state,
        event: action.payload.event,
      };
    case END_DRAG:
      return {
        isOn: false,
        data: emptyData,
        event: emptyEvent,
      };
    default:
      return state;
  }
};

export default drag;

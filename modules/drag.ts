// 현재 움직이고 있는(mousedown된) 오브젝트(target)와 x, y 위치입니다.
// position에서 drag로 이름을 바꿨습니다

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ObjectDataType } from "../dummies/dummyInterface";
import { InteractionDataType, MouseEventType } from "../types/types";

const emptyData = {} as InteractionDataType;
const emptyEvent = {} as MouseEventType;

interface DragState {
  isOn: boolean;
  data: InteractionDataType;
  event: MouseEventType;
}

const initialState: DragState = {
  isOn: false,
  data: emptyData,
  event: emptyEvent,
};

const dragSlice = createSlice({
  name: "drag",
  initialState,
  reducers: {
    startDrag: (
      _,
      action: PayloadAction<{
        event: MouseEventType;
        data: InteractionDataType;
      }>,
    ) => {
      return {
        isOn: true,
        data: action.payload.data,
        event: action.payload.event,
      };
    },
    moveDrag: (state, action: PayloadAction<MouseEventType>) => {
      return {
        ...state,
        event: action.payload,
      };
    },
    endDrag: () => {
      return {
        isOn: false,
        data: emptyData,
        event: emptyEvent,
      };
    },
  },
});

export const { startDrag, moveDrag, endDrag } = dragSlice.actions;
export default dragSlice.reducer;

// 현재 움직이고 있는(mousedown된) 오브젝트(target)와 x, y 위치입니다.
// position에서 drag로 이름을 바꿨습니다

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Drag2State {
  x: number;
  y: number;
}

//start, move end는 각각 mousedown, mousemove, mouseup 시에 호출됩니다

const initialState: Drag2State = {
  x: -100,
  y: -100,
};

const drag2Slice = createSlice({
  name: "drag2",
  initialState,
  reducers: {
    startDrag2: (_, action: PayloadAction<Drag2State>) => action.payload,
    updateDrag2: (_, action: PayloadAction<Drag2State>) => action.payload,
    endDrag2: () => initialState,
  },
});

export const { startDrag2, updateDrag2, endDrag2 } = drag2Slice.actions;
export default drag2Slice.reducer;

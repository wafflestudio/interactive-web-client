// div(container) 안에 있는 svg 모음입니다

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AreaDataType } from "../dummies/dummyInterface";

const initialState: AreaDataType[] = [];

const areasSlice = createSlice({
  name: "areas",
  initialState,
  reducers: {
    saveAreas: (_, action: PayloadAction<AreaDataType[]>) => {
      return action.payload;
    },
    updateArea: (state, action: PayloadAction<AreaDataType>) => {
      return state.map((item) =>
        item.id !== action.payload.id ? item : action.payload,
      );
    },
  },
});

export const { saveAreas, updateArea } = areasSlice.actions;
export default areasSlice.reducer;

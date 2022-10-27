// div(container) 안에 있는 svg 모음입니다

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ObjectDataType } from "../dummies/dummyInterface";

const initialState: ObjectDataType[] = [];

const staticObjectsSlice = createSlice({
  name: "staticObjects",
  initialState,
  reducers: {
    saveObjects: (state, action: PayloadAction<ObjectDataType[]>) =>
      state.concat(action.payload),
    updateObject: (state, action: PayloadAction<ObjectDataType>) =>
      state.map((item) =>
        item.id !== action.payload.id ? item : action.payload,
      ),
    toggleObjectVisibility: (
      state,
      action: PayloadAction<{
        targetObject: ObjectDataType;
        isVisible: boolean;
      }>,
    ) =>
      state.map((item) =>
        item.id !== action.payload.targetObject.id
          ? item
          : {
              ...action.payload.targetObject,
              visibility: action.payload.isVisible,
            },
      ),
  },
});

export const { saveObjects, updateObject, toggleObjectVisibility } =
  staticObjectsSlice.actions;
export default staticObjectsSlice.reducer;

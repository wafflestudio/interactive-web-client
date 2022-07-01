// div(container) 안에 있는 svg 모음입니다

import { ObjectDataType } from "../dummies/dummyInterface";

export const UPDATE_OBJECT = "staticObjects/UPDATE_OBJECT" as const;
export const SAVE_OBJECTS = "staticObjects/SAVE_OBJECTS" as const;

export const saveObjects = (objects: ObjectDataType[]) => ({
  type: SAVE_OBJECTS,
  payload: objects,
});

export const updateObject = (targetObject: ObjectDataType) => ({
  type: UPDATE_OBJECT,
  payload: targetObject,
});

type ObjectsAction =
  | ReturnType<typeof saveObjects>
  | ReturnType<typeof updateObject>;

const initialState: ObjectDataType[] = [];

const staticObjects = (
  state: ObjectDataType[] = initialState,
  action: ObjectsAction,
): ObjectDataType[] => {
  switch (action.type) {
    case SAVE_OBJECTS:
      return state.concat(action.payload);
    case UPDATE_OBJECT:
      return state.map((item) =>
        item.id !== action.payload.id ? item : action.payload,
      );
    default:
      return state;
  }
};

export default staticObjects;

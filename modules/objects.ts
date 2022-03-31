// div(container) 안에 있는 svg 모음입니다

import { ObjectDataType } from "../dummies/dummyInterface";

const UPDATE_OBJECT = "objects/UPDATE_OBJECT" as const;
const SAVE_OBJECTS = "objects/GET_OBJECTS" as const;

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

const objects = (
  state: ObjectDataType[] = initialState,
  action: ObjectsAction,
): ObjectDataType[] => {
  switch (action.type) {
    case SAVE_OBJECTS:
      return action.payload;
    case UPDATE_OBJECT:
      return state.map((item) =>
        item.id !== action.payload.id ? item : action.payload,
      );
    default:
      return state;
  }
};

export default objects;

// div(container) 안에 있는 svg 모음입니다

import { ObjectDataType } from "../dummies/dummyInterface";

export const UPDATE_OBJECT = "staticObjects/UPDATE_OBJECT" as const;
export const SAVE_OBJECTS = "staticObjects/SAVE_OBJECTS" as const;
export const TOGGLE_OBJECT_VISIBILITY =
  "staticObjects.TOGGLE_OBJECT_VISIBILITY";

export const saveObjects = (objects: ObjectDataType[]) => ({
  type: SAVE_OBJECTS,
  payload: { objects },
});

export const updateObject = (targetObject: ObjectDataType) => ({
  type: UPDATE_OBJECT,
  payload: { targetObject },
});

export const toggleObjectVisibility = (
  targetObject: ObjectDataType,
  isVisible: boolean,
) => ({
  type: TOGGLE_OBJECT_VISIBILITY,
  payload: { targetObject, isVisible },
});

type ObjectsAction =
  | ReturnType<typeof saveObjects>
  | ReturnType<typeof updateObject>
  | ReturnType<typeof toggleObjectVisibility>;

const initialState: ObjectDataType[] = [];

const staticObjects = (
  state: ObjectDataType[] = initialState,
  action: ObjectsAction,
): ObjectDataType[] => {
  switch (action.type) {
    case SAVE_OBJECTS:
      return state.concat(action.payload.objects);
    case UPDATE_OBJECT:
      return state.map((item) =>
        item.id !== action.payload.targetObject.id
          ? item
          : action.payload.targetObject,
      );
    case TOGGLE_OBJECT_VISIBILITY:
      return state.map((item) =>
        item.id !== action.payload.targetObject.id
          ? item
          : {
              ...action.payload.targetObject,
              visibility: action.payload.isVisible,
            },
      );
    default:
      return state;
  }
};

export default staticObjects;

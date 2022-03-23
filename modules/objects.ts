// div(container) 안에 있는 svg 모음입니다

import {ObjectDataType} from '../dummies/dummyInterface'

const GET_OBJECTS = 'objects/GET_OBJECTS' as const
const UPDATE_OBJECT = 'objects/UPDATE_OBJECT' as const

export const getObjects = (objects: ObjectDataType[]) => ({
  type: GET_OBJECTS,
  payload: objects
})

export const updateObject = (targetObject: ObjectDataType) => ({
  type: UPDATE_OBJECT,
  payload: targetObject
})

type ObjectsAction =
  | ReturnType<typeof getObjects>
  | ReturnType<typeof updateObject>

const initialState: ObjectDataType[] = []

function objects(
  state: ObjectDataType[] = initialState,
  action: ObjectsAction
): ObjectDataType[] {
  switch (action.type) {
    case GET_OBJECTS:
      return action.payload
    case UPDATE_OBJECT:
      return state.map((item) =>
        item.id !== action.payload.id ? item : action.payload
      )
    default:
      return state
  }
}

export default objects

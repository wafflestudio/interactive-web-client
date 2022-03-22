// div(container) 안에 있는 svg 모음입니다

const GET_OBJECTS = 'objects/GET_OBJECTS' as const

export const getObjects = (objects: HTMLCollection) => ({
  type: GET_OBJECTS,
  payload: objects
})

type ObjectsAction = ReturnType<typeof getObjects>

const initialState: HTMLCollection | any = {} // new HTMLCollection()이 안돼서 빈 HTMLCollection object를 만들지 못해 부득이하게 any를 썼습니다..
function objects(
  state: HTMLCollection = initialState,
  action: ObjectsAction
): HTMLCollection {
  switch (action.type) {
    case GET_OBJECTS:
      return action.payload
    default:
      return state
  }
}

export default objects

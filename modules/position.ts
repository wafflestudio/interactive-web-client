// 현재 움직이고 있는(mousedown된) 오브젝트(element)와 x, y 위치입니다.

const SET_POSITION = 'position/SET_POSITION' as const

type PositionState = {
  element: HTMLElement | null
  x: number
  y: number
}

export const setPosition = (position: PositionState) => ({
  type: SET_POSITION,
  payload: position
})

type PositionAction = ReturnType<typeof setPosition>

const initialState: PositionState = {
  element: null,
  x: 0,
  y: 0
}

function position(
  state: PositionState = initialState,
  action: PositionAction
): PositionState {
  switch (action.type) {
    case SET_POSITION:
      return {
        element: action.payload.element,
        x: action.payload.x,
        y: action.payload.y
      }
    default:
      return state
  }
}

export default position

// 현재 움직이고 있는(mousedown된) 오브젝트(target)와 x, y 위치입니다.
// position에서 drag로 이름을 바꿨습니다

import {ObjectDataType} from '../dummies/dummyInterface'

const START_DRAG = 'drag/START_DRAG' as const
const MOVE_DRAG = `drag/MOVE_DRAG` as const
const END_DRAG = 'drag/END_DRAG' as const

const emptyTarget = {} as ObjectDataType

type DragState = {
  isOn: boolean
  target: ObjectDataType
}

//start, move end는 각각 mousedown, mousemove, mouseup 시에 호출됩니다
export const startDrag = (target: ObjectDataType) => ({
  type: START_DRAG,
  payload: target
})

export const moveDrag = (x: number, y: number) => ({
  type: MOVE_DRAG,
  payload: {x, y}
})

export const endDrag = () => ({type: END_DRAG})

type DragAction =
  | ReturnType<typeof startDrag>
  | ReturnType<typeof moveDrag>
  | ReturnType<typeof endDrag>

const initialState: DragState = {isOn: false, target: emptyTarget}

function drag(state: DragState = initialState, action: DragAction): DragState {
  switch (action.type) {
    case START_DRAG:
      return {
        isOn: true,
        target: action.payload
      }
    case MOVE_DRAG:
      return {
        isOn: true,
        //target 의 x y 좌표에 mousemove event 의 변화량(movementX, Y)를 더합니다
        //debounce 는 되지 않았습니다
        target: {
          ...state.target,
          x: state.target.x + action.payload.x,
          y: state.target.y + action.payload.y
        }
      }
    case END_DRAG:
      return {
        isOn: false,
        target: emptyTarget
      }
    default:
      return state
  }
}

export default drag

// 현재 움직이고 있는(mousedown된) 오브젝트(target)와 x, y 위치입니다.
// position에서 drag로 이름을 바꿨습니다

export const START_DRAG = "drag/START_DRAG2" as const;
export const UPDATE_DRAG = "drag/UPDATE_DRAG2" as const;
export const END_DRAG = "drag/END_DRAG2" as const;

interface Drag2State {
  x: number;
  y: number;
}

//start, move end는 각각 mousedown, mousemove, mouseup 시에 호출됩니다
export const startDrag2 = (x: number, y: number) => ({
  type: START_DRAG,
  payload: { x, y },
});

export const updateDrag2 = (x: number, y: number) => ({
  type: UPDATE_DRAG,
  payload: { x, y },
});

export const endDrag2 = (x: number, y: number) => ({ type: END_DRAG });

type DragAction =
  | ReturnType<typeof startDrag2>
  | ReturnType<typeof updateDrag2>
  | ReturnType<typeof endDrag2>;

const initialState: Drag2State = {
  x: -100,
  y: -100,
};

const drag2 = (
  state: Drag2State = initialState,
  action: DragAction,
): Drag2State => {
  switch (action.type) {
    case START_DRAG:
      return { x: action.payload.x, y: action.payload.y };
    case UPDATE_DRAG:
      return { x: action.payload.x, y: action.payload.y };
    case END_DRAG:
      return initialState;
    default:
      return state;
  }
};

export default drag2;

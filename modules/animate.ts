import { ObjectDataType } from "../dummies/dummyInterface";

const ADD_ANIMATE = "animate/ADD_ANIMATE" as const;
const REMOVE_ANIMATE = "animate/REMOVE_ANIMATE" as const;

interface AnimateState {
  isOn: boolean;
  targetArr: ObjectDataType[];
}

const initialState: AnimateState = {
  isOn: false,
  targetArr: [],
};

export const addAnimate = (target: ObjectDataType) => ({
  type: ADD_ANIMATE,
  payload: target,
});

export const removeAnimate = (target: ObjectDataType) => ({
  type: REMOVE_ANIMATE,
  payload: target,
});

type AnimateAction =
  | ReturnType<typeof addAnimate>
  | ReturnType<typeof removeAnimate>;

const animate = (
  state: AnimateState = initialState,
  action: AnimateAction,
): AnimateState => {
  switch (action.type) {
    case ADD_ANIMATE:
      return { isOn: true, targetArr: [...state.targetArr, action.payload] };
    default:
      return state;
  }
};

export default animate;

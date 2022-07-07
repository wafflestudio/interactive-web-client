export const SET_WS = "ws/SET_WS" as const;

export const setWs = (webSocketObject: any) => ({
  type: SET_WS,
  payload: webSocketObject,
});

type wsAction = ReturnType<typeof setWs>;

const initialState: { current: any } = { current: null };

const ws = (state = initialState, action: wsAction) => {
  switch (action.type) {
    case SET_WS:
      return { current: action.payload };
    default:
      return state;
  }
};

export default ws;

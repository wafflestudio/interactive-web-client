export const SET_WS = "ws/SET_WS" as const;
export const SET_MESSAGE = "ws/SET_MESSAGE" as const;
export const CLOSE_WS = "ws/CLOSE_WS" as const;

export const setWs = (webSocketObject: WebSocket) => ({
  type: SET_WS,
  payload: webSocketObject,
});
export const setMessage = (message: string) => ({
  type: SET_MESSAGE,
  payload: message,
});

export const closeWs = () => ({
  type: CLOSE_WS,
});

type wsAction =
  | ReturnType<typeof setWs>
  | ReturnType<typeof setMessage>
  | ReturnType<typeof closeWs>;

const initialState: {
  current: WebSocket | null;
  recentMessage: { messageNo: number; content: null | string };
} = {
  current: null,
  recentMessage: { messageNo: 0, content: null },
};

const ws = (state = initialState, action: wsAction) => {
  switch (action.type) {
    case SET_WS:
      return { ...state, current: action.payload };
    case SET_MESSAGE:
      return {
        ...state,
        recentMessage: {
          messageNo: state.recentMessage.messageNo + 1,
          content: action.payload,
        },
      };
    case CLOSE_WS:
      return initialState;
    default:
      return state;
  }
};

export default ws;

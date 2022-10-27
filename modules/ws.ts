import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  current: WebSocket | null;
  recentMessage: { messageNo: number; content: null | string };
} = {
  current: null,
  recentMessage: { messageNo: 0, content: null },
};

const wsSlice = createSlice({
  name: "ws",
  initialState,
  reducers: {
    setWs: (state, action: PayloadAction<WebSocket>) => {
      state.current = action.payload;
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.recentMessage.messageNo++;
      state.recentMessage.content = action.payload;
    },
    closeWs: () => initialState,
  },
});

export const { setWs, setMessage, closeWs } = wsSlice.actions;
export default wsSlice.reducer;

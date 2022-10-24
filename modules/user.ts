import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDataType } from "../types/types";

const initialState: UserDataType = {
  isLoggedIn: false,
  user_id: "",
  username: "",
  email: "",
  date_joined: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_, action: PayloadAction<UserDataType>) => action.payload,
    removeUser: () => initialState,
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;

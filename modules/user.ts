import { UserDataType } from "../types/types";

const SET_USER = "user/SET_USER" as const;
const REMOVE_USER = "user/REMOVE_USER" as const;

export const setUser = (user: UserDataType) => ({
  type: SET_USER,
  payload: user,
});

export const removeUser = () => ({
  type: REMOVE_USER,
});

type ObjectsAction = ReturnType<typeof setUser> | ReturnType<typeof removeUser>;

const initialState: UserDataType = {
  isLoggedIn: false,
  user_id: null,
  username: null,
  email: null,
  date_joined: null,
};

function user(
  state: UserDataType = initialState,
  action: ObjectsAction,
): UserDataType {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    case REMOVE_USER:
      return initialState;
    default:
      return state;
  }
}

export default user;

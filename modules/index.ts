import { combineReducers } from "redux";
import animate from "./animate";
import areas from "./areas";
import drag from "./drag";
import objects from "./objects";
import testType from "./testType";
import user from "./user";

const rootReducer = combineReducers({
  drag,
  objects,
  testType,
  user,
  areas,
  animate,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

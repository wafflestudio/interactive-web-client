import { combineReducers } from "redux";
import animate from "./animate";
import areas from "./areas";
import canvasRef from "./canvasRef";
import drag from "./drag";
import staticObjects from "./staticObjects";
import user from "./user";
import modal from "./modal";

const rootReducer = combineReducers({
  drag,
  staticObjects,
  user,
  areas,
  animate,
  canvasRef,
  modal,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

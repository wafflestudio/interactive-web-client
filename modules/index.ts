import { combineReducers } from "redux";
import animate from "./animate";
import areas from "./areas";
import canvasRef from "./canvasRef";
import drag from "./drag";
import objects from "./objects";
import testType from "./testType";

const rootReducer = combineReducers({
  drag,
  objects,
  testType,
  areas,
  animate,
  canvasRef,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

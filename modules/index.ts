import { combineReducers } from "redux";
import addModal from "./addModal";
import animate from "./animate";
import areas from "./areas";
import canvasRef from "./canvasRef";
import drag from "./drag";
import modal from "./modal";
import pixiGraphics from "./pixiGraphics";
import staticObjects from "./staticObjects";
import user from "./user";
import ws from "./ws";

const rootReducer = combineReducers({
  drag,
  staticObjects,
  user,
  areas,
  animate,
  canvasRef,
  modal,
  addModal,
  ws,
  pixiGraphics,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

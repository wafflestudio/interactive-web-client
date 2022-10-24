import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, combineReducers, createStore } from "redux";
import addModal from "./addModal";
import animate from "./animate";
import { api } from "./api";
import areas from "./areas";
import auth from "./auth";
import canvasRef from "./canvasRef";
import drag from "./drag";
import drag2 from "./drag2";
import logMiddleware from "./middlewares/logMiddleware";
import staticsMiddleware from "./middlewares/staticsMiddleware";
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
  drag2,
  auth,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
export const store = () =>
  configureStore({
    reducer: { ...rootReducer, [api.reducerPath]: api.reducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
export type AppStore = ReturnType<typeof store>;
export const wrapper = createWrapper<AppStore>(store, { debug: true });

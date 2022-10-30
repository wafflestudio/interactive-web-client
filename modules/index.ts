import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import addModal from "./addModal";
import animate from "./animate";
import { api } from "./api/api";
import areas from "./areas";
import auth from "./auth";
import canvasRef from "./canvasRef";
import drag from "./drag";
import drag2 from "./drag2";
import logMiddleware from "./middlewares/logMiddleware";
//import staticsMiddleware from "./middlewares/staticsMiddleware";
import modal from "./modal";
import pixiGraphics from "./pixiGraphics";
import staticObjects from "./staticObjects";
import user from "./user";
import ws from "./ws";

export const store = () =>
  configureStore({
    reducer: {
      drag,
      drag2,
      addModal,
      animate,
      areas,
      auth,
      canvasRef,
      modal,
      //   pixiGraphics,
      staticObjects,
      user,
      ws,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        api.middleware,
        logMiddleware,
        //staticsMiddleware,
      ),
  });

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export const wrapper = createWrapper<AppStore>(store, { debug: true });

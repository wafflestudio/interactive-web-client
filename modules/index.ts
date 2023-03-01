import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import addModal from "./addModal";
import { api } from "./api/api";
import auth from "./auth";
import logMiddleware from "./middlewares/logMiddleware";
import modal from "./modal";
import user from "./user";
import ws from "./ws";

export const store = () =>
  configureStore({
    reducer: {
      addModal,

      auth,
      modal,
      user,
      ws,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware, logMiddleware),
  });

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export const wrapper = createWrapper<AppStore>(store, { debug: true });

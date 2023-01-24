"use client";

import React from "react";

import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "../modules";
import logMiddleware from "../modules/middlewares/logMiddleware";
import staticsMiddleware from "../modules/middlewares/staticsMiddleware";

export const store = createStore(
  rootReducer,
  applyMiddleware(logMiddleware, staticsMiddleware),
);

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default RootProvider;

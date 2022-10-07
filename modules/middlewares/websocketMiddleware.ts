import { Middleware } from "redux";
import { START_DRAG } from "../drag";

const websocketMiddleware: Middleware<unknown, any, any> =
  (store) => (next) => (action) => {
    const { type, payload } = action;
    if (type == START_DRAG) console.log(store.getState().drag);
    const result = next(action);
    if (type == START_DRAG) console.log(store.getState().drag);
    return result;
  };

export default websocketMiddleware;

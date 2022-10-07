import { Middleware } from "redux";
import { START_DRAG } from "../drag";

const logMiddleware: Middleware<unknown, any, any> =
  (store) => (next) => (action) => {
    const { type, payload } = action;
    const result = next(action);
    return result;
  };

export default logMiddleware;

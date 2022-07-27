import { Middleware } from "redux";

const myMiddleware: Middleware<unknown, any, any> =
  (store) => (next) => (action) => {
    const { type, payload } = action;

    let result;

    if (!result) {
      result = next(action);
    }

    return result;
  };

export default myMiddleware;

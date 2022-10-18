import { Middleware } from "redux";
import { InteractionDataType } from "../../types/types";
import { END_DRAG, MOVE_DRAG, START_DRAG } from "../drag";
import { toggleObjectVisibility, updateObject } from "../staticObjects";

const staticsMiddleware: Middleware<unknown, any, any> =
  (store) => (next) => (action) => {
    const { type, payload } = action;
    const data = payload?.data as InteractionDataType;
    switch (type) {
      case START_DRAG:
        console.log("invisible");
        store.dispatch(toggleObjectVisibility(data, false));
        break;
      case MOVE_DRAG:
        break;
      case END_DRAG:
        break;
      default:
        break;
    }
    const result = next(action);
    switch (type) {
      case START_DRAG:
        break;
      case MOVE_DRAG:
        break;
      case END_DRAG:
        break;
      default:
        break;
    }
    return result;
  };

export default staticsMiddleware;

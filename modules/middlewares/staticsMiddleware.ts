import { createListenerMiddleware } from "@reduxjs/toolkit";
import { Middleware } from "redux";
import { InteractionDataType } from "../../types/types";
import { startDrag } from "../drag";
import { toggleObjectVisibility } from "../staticObjects";

const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  actionCreator: startDrag,
  effect: (action, listenerApi) => {
    const data = action.payload.data;
    listenerApi.dispatch(
      toggleObjectVisibility({ targetObject: data, isVisible: false }),
    );
  },
});

// const staticsMiddleware: Middleware<unknown, any, any> =
//   (store) => (next) => (action) => {
//     const { type, payload } = action;
//     const data = payload?.data as InteractionDataType;
//     switch (type) {
//       case START_DRAG:
//         console.log("invisible");
//         store.dispatch(toggleObjectVisibility(data, false));
//         break;
//       case MOVE_DRAG:
//         break;
//       case END_DRAG:
//         break;
//       default:
//         break;
//     }
//     const result = next(action);
//     switch (type) {
//       case START_DRAG:
//         break;
//       case MOVE_DRAG:
//         break;
//       case END_DRAG:
//         break;
//       default:
//         break;
//     }
//     return result;
//   };

// export default staticsMiddleware;

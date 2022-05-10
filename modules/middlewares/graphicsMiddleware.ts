import { Middleware } from "redux";
import { drawEllipse } from "../../components/dev/DynamicCanvas/previews/canvasRect";
import { RENDER_REF, toggleCanvasRef } from "../canvasRef";
import { END_DRAG, MOVE_DRAG, START_DRAG } from "../drag";
import { RootState } from "../index";
import { updateObject } from "../staticObjects";
import { closeSimpleInfoModals, OPEN_SIMPLE_INFO_MODAL } from "../modal";

const graphicsMiddleware: Middleware<unknown, RootState> =
  (store) => (next) => (action) => {
    let result;

    //Drag
    if (action.type === START_DRAG) {
    }
    if (action.type === MOVE_DRAG) {
      store.dispatch(closeSimpleInfoModals());
    }
    if (action.type === END_DRAG) {
      store.dispatch(updateObject(store.getState().drag.target));
      store.dispatch(toggleCanvasRef(false));
    }

    //Animate

    //Modal
    if (action.type === OPEN_SIMPLE_INFO_MODAL) {
      store.dispatch(closeSimpleInfoModals());
    }

    //Render
    if (action.type === RENDER_REF) {
      if (store.getState().drag.isOn) {
        const ref = store.getState().canvasRef.ref;
        if (ref?.current) {
          const ctx = ref.current.getContext("2d");
          const dragTarget = store.getState().drag.target;
          if (ctx) {
            ctx.clearRect(0, 0, ref.current.width, ref.current.height);
            drawEllipse(
              ctx,
              dragTarget.geometry,
              dragTarget.svgData.fill
                ? dragTarget.svgData.fill
                : "rgba(0,0,0,0)",
            );
          }
        }
      }
    } else {
    }

    if (!result) {
      result = next(action);
    }
    return result;
  };

export default graphicsMiddleware;

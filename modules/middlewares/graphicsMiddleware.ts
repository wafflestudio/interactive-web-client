import { Middleware } from "redux";
import { drawEllipse } from "../../components/dev/DynamicCanvas/previews/canvasRect";
import { RENDER_REF, toggleCanvasRef } from "../canvasRef";
import { END_DRAG, MOVE_DRAG, START_DRAG } from "../drag";
import { RootState } from "../index";
import { updateObject } from "../staticObjects";

const graphicsMiddleware: Middleware<unknown, RootState> =
  (store) => (next) => (action) => {
    let result;

    //Canvas

    //Drag
    if (action.type === START_DRAG) {
      store.dispatch(toggleCanvasRef(true));
    }

    if (action.type === MOVE_DRAG) {
    }

    if (action.type === END_DRAG) {
      store.dispatch(updateObject(store.getState().drag.target));
      store.dispatch(toggleCanvasRef(false));
    }

    //Render
    if (action.type === RENDER_REF) {
      if (store.getState().drag.isOn) {
        const ref = store.getState().canvasRef.ref;
        const ctx = ref.current.getContext("2d");
        const dragTarget = store.getState().drag.target;
        ctx.clearRect(0, 0, ref.current.width, ref.current.height);
        drawEllipse(
          ctx,
          dragTarget.geometry,
          dragTarget.svgData.fill ? dragTarget.svgData.fill : "rgba(0,0,0,0)",
        );
      }
    } else {
      // console.log(action.type);
    }

    if (!result) {
      result = next(action);
    }
    return result;
  };

export default graphicsMiddleware;

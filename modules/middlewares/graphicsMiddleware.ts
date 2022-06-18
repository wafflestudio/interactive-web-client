import { Middleware } from "redux";
import {
  drawEllipse,
  drawImage,
  drawRect,
} from "../../components/dev/DynamicCanvas/previews/canvasRect";
import { RENDER_REF, toggleCanvasRef } from "../canvasRef";
import { END_DRAG, MOVE_DRAG, START_DRAG } from "../drag";
import { RootState } from "../index";
import {
  closeSimpleInfoModal,
  OPEN_DETAIL_INFO_MODAL,
  OPEN_SIMPLE_INFO_MODAL,
  openSimpleInfoModal,
} from "../modal";
import { updateObject } from "../staticObjects";

const graphicsMiddleware: Middleware<unknown, RootState> =
  (store) => (next) => (action) => {
    let result;

    //Drag
    if (action.type === START_DRAG) {
    }
    if (action.type === MOVE_DRAG) {
      store.dispatch(closeSimpleInfoModal());
    }
    if (action.type === END_DRAG) {
      store.dispatch(openSimpleInfoModal(store.getState().drag.target));

      store.dispatch(updateObject(store.getState().drag.target));
      const ref = store.getState().canvasRef.ref;
      if (ref?.current) {
        const ctx = ref.current.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, ref.current.width, ref.current.height);
        }
      }

      store.dispatch(toggleCanvasRef(false));
    }

    //Animate

    //Modal
    if (
      action.type === OPEN_SIMPLE_INFO_MODAL ||
      action.type === OPEN_DETAIL_INFO_MODAL
    ) {
      store.dispatch(closeSimpleInfoModal());
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
            if (dragTarget.svgData.svgType === "ellipse")
              drawEllipse(
                ctx,
                dragTarget.geometry,
                dragTarget.svgData.fill
                  ? dragTarget.svgData.fill
                  : "rgba(0,0,0,0)",
                dragTarget.svgData.stroke
                  ? dragTarget.svgData.stroke
                  : "rgba(0,0,0,0)",
              );
            else if (dragTarget.svgData.svgType === "rect")
              drawRect(
                ctx,
                dragTarget.geometry,
                dragTarget.svgData.fill
                  ? dragTarget.svgData.fill
                  : "rgba(0,0,0,0)",
                dragTarget.svgData.stroke
                  ? dragTarget.svgData.stroke
                  : "rgba(0,0,0,0)",
              );
            else if (dragTarget.svgData.svgType === "image") {
              const img = document.createElement("img");
              img.src = dragTarget.svgData.src || "";
              drawImage(ctx, img, dragTarget.geometry);
            }
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

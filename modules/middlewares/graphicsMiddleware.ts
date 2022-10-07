import { Middleware } from "redux";
import {
  drawEllipse,
  drawImage,
  drawRect,
} from "../../components/dev/DynamicCanvas/previews/canvasRect";
import {
  endDragRender,
  startDragRender,
  updateDragRender,
} from "../../functions/pixi/renderer";
import { RENDER_REF, toggleCanvasRef } from "../canvasRef";
import { END_DRAG, MOVE_DRAG, START_DRAG } from "../drag";
import { RootState } from "../index";
import {
  closeSimpleInfoModal,
  OPEN_DETAIL_INFO_MODAL,
  OPEN_SIMPLE_INFO_MODAL,
  openSimpleInfoModal,
} from "../modal";
import { SAVE_OBJECTS, updateObject } from "../staticObjects";

const graphicsMiddleware: Middleware<unknown, RootState> =
  (store) => (next) => (action) => {
    let result;
    const { current: socket } = store.getState().ws;

    //Drag
    if (action.type === START_DRAG) {
      startDragRender(action.payload.target, (x, y) => {
        console.log(x);
      });
    }
    if (action.type === MOVE_DRAG) {
      store.dispatch(closeSimpleInfoModal());
      updateDragRender(action.payload.x, action.payload.y);
      console.log(action.payload.x);
      const dragTarget = store.getState().drag.target;
      const message = JSON.stringify({
        method: "PATCH",
        URI: `objects/${dragTarget.id}`,
        data: dragTarget.geometry,
      });
      console.log(message);
      socket?.send(message);
    }
    if (action.type === END_DRAG) {
      endDragRender(
        store.getState().drag.target.geometry.x,
        store.getState().drag.target.geometry.y,
      );
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

    if (action.type === SAVE_OBJECTS) {
      action.payload.map((e) => {
        const message = JSON.stringify({
          method: "POST",
          URI: `objects`,
          data: e,
        });
        console.log(message);
        socket?.send(message);
      });
    }

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

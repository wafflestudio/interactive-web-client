import { Graphics, InteractionManager } from "pixi.js";
import { GeometryType, ObjectDataType } from "../dummies/dummyInterface";
import { drawEllipse } from "../functions/pixi/pixiGraphicFunction";
import { RootState } from "../modules";
import drag from "../modules/drag";
import { endDrag2, startDrag2 } from "../modules/drag2";
import { store } from "../pages/_app";

interface ConfigType {
  renderType: "drag" | "fadein" | "fadeout";
  geometry: GeometryType;
}

interface QueueType {
  id: number;
  graphic: Graphics;
  callback: () => void;
}
interface DragQueueType {
  data: ObjectDataType;
  graphic: Graphics;
  callback: (x: number, y: number) => void;
}
const renderQueue: QueueType[] = [];
const dragQueue: DragQueueType[] = [];

const useRender = () => {
  const startRender = (data: ObjectDataType, callback: () => void) => {
    const { ref } = store.getState().canvasRef;
    const { id, geometry } = data;
    if (ref) {
      const graphic = drawEllipse(geometry);
      ref.stage.addChild(graphic);
      renderQueue.push({ id: id, graphic: graphic, callback: callback });
      console.log(renderQueue);
    }
  };
  const endRender = (id: number) => {
    const { ref } = store.getState().canvasRef;
    if (ref) {
      const target = renderQueue.find((item) => item.id === id);
      console.log(renderQueue);
      if (target) {
        if (target.callback) {
          target.callback();
        }
        ref?.stage.removeChild(target.graphic);
        renderQueue.splice(renderQueue.indexOf(target), 1);
      }
    }
  };
};

export const startDragRender = (
  data: ObjectDataType,
  callback: (x: number, y: number) => void,
) => {
  const { ref } = store.getState().canvasRef;
  if (!ref) {
    return null;
  }
  const { geometry } = data;
  const graphic = drawEllipse(geometry);
  ref.stage.addChild(graphic);
  dragQueue.push({
    data: data,
    graphic: graphic,
    callback: callback,
  });
};

export const updateDragRender = (x: number, y: number) => {
  const { ref } = store.getState().canvasRef;
  if (!ref) {
    return null;
  }
  dragQueue.forEach((item) => {
    item.graphic.x = x - item.data.geometry.x;
    item.graphic.y = y - item.data.geometry.y;
  });
};

export const endDragRender = (x: number, y: number) => {
  const { ref } = store.getState().canvasRef;
  if (!ref) {
    return null;
  }
  dragQueue.forEach((item) => {
    item.callback(x, y);
    ref.stage.removeChild(item.graphic);
  });
  dragQueue.splice(0, dragQueue.length);
};

export default useRender;

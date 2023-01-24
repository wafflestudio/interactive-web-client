import { Graphics } from "pixi.js";
import { store } from "../../app/provider";
import { InteractionDataType, MouseEventType } from "../../types/types";
import { convertObjectToGraphics, drawEllipse } from "./pixiGraphicFunction";

export interface OffsetType {
  x: number;
  y: number;
}

export interface EffectType {
  startEffect?: (
    graphics: Graphics,
    data: InteractionDataType,
    e: MouseEventType,
    offset: OffsetType,
  ) => void;
  updateEffect?: (
    graphics: Graphics,
    data: InteractionDataType,

    e: MouseEventType,
    offset: OffsetType,
  ) => void;
  endEffect?: (
    graphics: Graphics,
    data: InteractionDataType,
    e: MouseEventType,
    offset: OffsetType,
  ) => void;
}

interface QueueType {
  id: number;
  graphic: Graphics;
  callback: () => void;
}
interface DragQueueType {
  data: InteractionDataType;
  graphic: Graphics;
  offset: { x: number; y: number };
  effects: EffectType;
}
const renderQueue: QueueType[] = [];
const dragQueue: DragQueueType[] = [];
//
// const renderer = () => {
//   const startRender = (data: ObjectDataType, callback: () => void) => {
//     const { ref } = store.getState().canvasRef;
//     const { id, geometry } = data;
//     if (ref) {
//       const graphic = drawEllipse(geometry);
//       ref.stage.addChild(graphic);
//       renderQueue.push({ id: id, graphic: graphic, callback: callback });
//       console.log(renderQueue);
//     }
//   };
//   const endRender = (id: number) => {
//     const { ref } = store.getState().canvasRef;
//     if (ref) {
//       const target = renderQueue.find((item) => item.id === id);
//       console.log(renderQueue);
//       if (target) {
//         if (target.callback) {
//           target.callback();
//         }
//         ref?.stage.removeChild(target.graphic);
//         renderQueue.splice(renderQueue.indexOf(target), 1);
//       }
//     }
//   };
// };

export const addDragQueue = (
  e: MouseEventType,
  data: InteractionDataType,
  effects: EffectType,
) => {
  const { ref } = store.getState().canvasRef;
  if (!ref) {
    return null;
  }
  const graphic = convertObjectToGraphics(data);
  const offset = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
  ref.stage.addChild(graphic);
  dragQueue.push({
    data,
    offset,
    graphic,
    effects,
  });
  if (effects.startEffect) {
    effects.startEffect(graphic, data, e, offset);
  }
};

export const updateDragQueue = (e: MouseEventType) => {
  const { ref } = store.getState().canvasRef;
  if (!ref) {
    return null;
  }
  dragQueue.forEach((item) => {
    const { graphic, effects, offset, data } = item;
    if (effects.updateEffect) {
      effects.updateEffect(graphic, data, e, offset);
    }
  });
};

export const clearDragQueue = (e: MouseEventType) => {
  const { ref } = store.getState().canvasRef;
  if (!ref) {
    return null;
  }
  dragQueue.forEach((item) => {
    const { graphic, effects, offset, data } = item;
    if (effects.endEffect) {
      effects.endEffect(graphic, data, e, offset);
    }
    ref.stage.removeChild(item.graphic);
  });
  dragQueue.splice(0, dragQueue.length);
};
//
// export default renderer;

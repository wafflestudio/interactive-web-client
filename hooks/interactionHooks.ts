import {
  addDragQueue,
  updateDragQueue,
  clearDragQueue,
  EffectType,
} from "../functions/pixi/renderer";
import { endDrag, moveDrag, startDrag } from "../modules/drag";
import { store } from "../pages/_app";
import { InteractionDataType, MouseEventType } from "../types/types";

export const interactDrag: () => {
  start: (
    e: MouseEventType,
    data: InteractionDataType,
    effects: EffectType,
  ) => void;
  update: (e: MouseEventType) => void;
  end: (e: MouseEventType) => void;
} = () => {
  const start: (
    e: MouseEventType,
    data: InteractionDataType,
    effects: EffectType,
  ) => void = (
    e: MouseEventType,
    data: InteractionDataType,
    effects: EffectType,
  ) => {
    addDragQueue(e, data, effects);
    store.dispatch(startDrag(e, data));
  };
  const update: (e: MouseEventType) => void = (e: MouseEventType) => {
    updateDragQueue(e);
    store.dispatch(moveDrag(e));
  };
  const end: (e: MouseEventType) => void = (e: MouseEventType) => {
    clearDragQueue(e);
    store.dispatch(endDrag(e));
  };

  return { start, update, end };
};

import {
  addDragQueue,
  updateDragQueue,
  clearDragQueue,
  EffectType,
} from "../functions/pixi/renderer";
import { InteractionDataType, MouseEventType } from "../types/types";

export const useDrag: () => {
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
  };
  const update: (e: MouseEventType) => void = (e: MouseEventType) => {
    updateDragQueue(e);
  };
  const end: (e: MouseEventType) => void = (e: MouseEventType) => {
    clearDragQueue(e);
  };

  return { start, update, end };
};

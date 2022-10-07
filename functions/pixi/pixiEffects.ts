import { Graphics } from "pixi.js";
import { InteractionDataType, MouseEventType } from "../../types/types";
import { OffsetType } from "./renderer";

type EffectFunctionType = (
  graphic: Graphics,
  data: InteractionDataType,
  e: MouseEventType,
  offset: OffsetType,
) => void;

export const dragUpdateFx = () => {
  const follow: EffectFunctionType = (graphic, data, e, offset) => {
    graphic.x = e.clientX - data.geometry.x - offset.x;
    graphic.y = e.clientY - data.geometry.y - offset.y;
  };
  return { follow };
};
//combineFx

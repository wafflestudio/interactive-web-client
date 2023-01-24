import { string2hex } from "@pixi/utils";
import * as PIXI from "pixi.js";
import { GeometryType } from "../../dummies/dummyInterface";
import { saveCanvasRef } from "../../modules/canvasRef";
import { store } from "../../app/provider";
import { InteractionDataType } from "../../types/types";

export const createPixiApp = (width: number, height: number) => {
  const pixiApp = new PIXI.Application({
    width: width,
    height: height,
    transparent: true,
  });
  store.dispatch(saveCanvasRef(pixiApp));
  return pixiApp;
};

export const drawEllipse = (
  geometry: GeometryType,
  fill = "#ffffff",
  stroke = "#ffffff",
) => {
  const graphics = new PIXI.Graphics();
  const { x, y, w, h } = geometry;
  graphics.lineStyle(1, string2hex(stroke), 1);
  graphics.beginFill(string2hex(fill), 1);
  graphics.drawEllipse(x + w / 2, y + h / 2, w / 2, h / 2);
  graphics.endFill();
  return graphics;
};

export const convertObjectToGraphics = (data: InteractionDataType) => {
  const { geometry, svgData } = data;
  const { x, y, w, h } = geometry;
  const { svgType, fill, stroke } = svgData;
  switch (svgType) {
    case "rect":
      return new PIXI.Graphics();
    case "ellipse":
      return drawEllipse({ x: x, y: y, w, h }, fill, stroke);
    default:
      console.log("!!!wrong svgType input!!!");
      return new PIXI.Graphics();
  }
};

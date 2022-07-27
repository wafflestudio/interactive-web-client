import * as PIXI from "pixi.js";
import { GeometryType } from "../../dummies/dummyInterface";
import { saveCanvasRef } from "../../modules/canvasRef";
import { store } from "../../pages/_app";

export const createPixiApp = (width: number, height: number) => {
  const pixiApp = new PIXI.Application({
    width: width,
    height: height,
    transparent: true,
  });
  store.dispatch(saveCanvasRef(pixiApp));
  return pixiApp;
};

export const drawEllipse = (geometry: GeometryType) => {
  const graphics = new PIXI.Graphics();
  const { x, y, w, h } = geometry;
  graphics.lineStyle(2, 0xffffff, 1);
  graphics.beginFill(0xaa4f08, 1);
  graphics.drawEllipse(x, y, w / 2, h / 2);
  graphics.endFill();
  graphics.pivot.x = 0.5;
  graphics.pivot.y = 0.5;

  return graphics;
};

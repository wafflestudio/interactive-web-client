import { Graphics, useTick } from "@inlet/react-pixi";
import { useDispatch } from "react-redux";
import { GeometryType, PixiDataType } from "../../dummies/dummyInterface";
import { updatePixi } from "../../modules/pixiGraphics";
import { store } from "../../pages/_app";

const makeDraw = (data: PixiDataType, tick: number) => {
  const { geometry, svgData } = data;
  const { x, y, w, h } = geometry;
  switch (svgData.svgType) {
    case "rect":
      return (g) => {
        g.clear();
        g.lineStyle(2, 0x0000ff, 1);
        g.beginFill(0xff700b, 1);
        g.drawRect(x + tick, y, w, h);
      };
    default:
      return (g) => {
        g.clear();
      };
  }
};

const PixiGraphic = ({ data }: { data: PixiDataType }) => {
  let tick = 0;
  const { id, geometry, svgData, animation } = data;

  console.log("!!!graphic!!!");

  useTick(() => {
    tick++;
  });
  return <Graphics draw={makeDraw(data, tick)} />;
};

export default PixiGraphic;

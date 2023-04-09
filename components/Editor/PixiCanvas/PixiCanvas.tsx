import { Container, Sprite, Stage, Text, Graphics } from "@inlet/react-pixi";
import { Graphics as GraphicsType, TextMetrics, TextStyle } from "pixi.js";
import { IImageObject, IObject, ITextObject } from "../../../types/base";
import {
  onContainerDragEnd,
  onContainerDragMove,
  onContainerDragStart,
  onDragEnd,
  onDragMove,
  onDragStart,
} from "./drag";

const dummyObjects: IObject[] = [
  {
    id: 0,
    name: "ghost",
    isInteractive: true,
    positionX: 0,
    positionY: 0,
    width: 100,
    height: 100,
    zIndex: 1,
    opacity: 1,
    type: "image",
    imageSource: "/images/ex_ghost.png",
    isReversed: false,
    rotateDegree: 0,
  },
  {
    id: 1,
    name: "title",
    isInteractive: true,
    positionX: 150,
    positionY: 150,
    width: 1900,
    height: 100,
    zIndex: 2,
    opacity: 1,
    type: "text",
    textContent: "I am a ghost",
    fontSize: 20,
    fontFamily: "sans-serif",
    lineHeight: 1.2,
    letterSpacing: 20,
    color: "#04f3e4",
    strokeWidth: 5,
    strokeColor: "#01d27e",
    backgroundColor: "#c34d32",
    borderWidth: 10,
    borderColor: "#e19230",
  },
];

const PixiCanvas = () => {
  return (
    <Stage>
      {dummyObjects.map((object) => {
        if (object.type === "image") {
          return <ImageObject object={object} />;
        } else if (object.type === "text") {
          return <TextContainer object={object} />;
        }
      })}
    </Stage>
  );
};

export default PixiCanvas;

const ImageObject = ({ object }: { object: IImageObject }) => (
  <Sprite
    key={object.id}
    image={object.imageSource}
    x={object.positionX}
    y={object.positionY}
    width={object.width}
    height={object.height}
    interactive={true}
    buttonMode={true}
    mousedown={onDragStart}
    mouseup={onDragEnd}
    mouseupoutside={onDragEnd}
    mousemove={onDragMove}
  />
);

const TextContainer = ({ object }: { object: ITextObject }) => {
  const style = new TextStyle({
    fontFamily: object.fontFamily,
    fontSize: object.fontSize,
    stroke: object.strokeColor,
    strokeThickness: object.strokeWidth,
    letterSpacing: object.letterSpacing,
    lineHeight: object.lineHeight,
    fill: object.color,
  });

  const textMetrics = TextMetrics.measureText(object.textContent, style);

  const draw = (g: GraphicsType) => {
    // Graphics를 그리는 함수
    g.clear();
    // 테두리
    g.lineStyle(
      object.borderWidth,
      Number("0x" + object.borderColor.substring(1)), // 색을 hex color로 표현
    );
    // 안에 색깔
    g.beginFill(Number("0x" + object.backgroundColor.substring(1)), 1);
    // 배경 위치 및 크기
    g.drawRect(
      object.positionX,
      object.positionY,
      textMetrics.width + object.strokeWidth * 2,
      textMetrics.height + object.strokeWidth * 2,
    );
  };

  return (
    <Container
      interactive={true}
      buttonMode={true}
      mousedown={onContainerDragStart}
      mouseup={onContainerDragEnd}
      mouseupoutside={onContainerDragEnd}
      mousemove={onContainerDragMove}
    >
      {/* 텍스트의 배경색 표현 */}
      <Graphics draw={draw} />
      {/* 텍스트 표현 */}
      <Text
        key={object.id}
        x={object.positionX + object.strokeWidth}
        y={object.positionY + object.strokeWidth}
        text={object.textContent}
        interactive={true}
        buttonMode={true}
        style={style}
      />
    </Container>
  );
};

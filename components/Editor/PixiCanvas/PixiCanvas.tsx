import { Container, Sprite, Stage, Text, Graphics } from "@inlet/react-pixi";
import { Graphics as GraphicsType, TextStyle } from "pixi.js";
import { useCallback } from "react";
import { IObject, ITextObject } from "../../../types/base";
import { onDragEnd, onDragMove, onDragStart } from "./drag";

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
    width: 500,
    height: 100,
    zIndex: 2,
    opacity: 1,
    type: "text",
    textContent: "I am a ghost",
    fontSize: 32,
    fontFamily: "sans-serif",
    lineHeight: 1.2,
    letterSpacing: 20,
    backgroundColor: "yellow",
    strokeWidth: 5,
    strokeColor: "#01d27e",
  },
];

const PixiCanvas = () => {
  //   const draw = useCallback(
  //     () => (g: GraphicsType, object: ITextObject) => {
  //       g.clear();
  //       g.beginFill(0xff700b, 1);
  //       g.drawRect(
  //         object.positionX,
  //         object.positionY,
  //         object.width,
  //         object.height,
  //       );
  //     },
  //     [],
  //   );

  return (
    <Stage>
      {dummyObjects.map((object) => {
        if (object.type === "image") {
          return (
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
        } else if (object.type === "text") {
          const draw = (g: GraphicsType) => {
            g.clear();
            g.beginFill(0xff700b, 1);
            g.drawRect(
              object.positionX,
              object.positionY,
              object.width,
              object.height,
            );
          };

          return (
            // <Container>
            //   <Graphics draw={draw} />
            <Text
              key={object.id}
              x={object.positionX}
              y={object.positionY}
              text={object.textContent}
              interactive={true}
              buttonMode={true}
              mousedown={onDragStart}
              mouseup={onDragEnd}
              mouseupoutside={onDragEnd}
              mousemove={onDragMove}
              width={object.width}
              height={object.height}
              style={
                new TextStyle({
                  fontFamily: object.fontFamily,
                  fontSize: object.fontSize,
                  stroke: object.strokeColor,
                  strokeThickness: object.strokeWidth,
                  letterSpacing: object.letterSpacing,
                  lineHeight: object.lineHeight,
                })
              }
            />
            // </Container>
          );
        }
      })}
    </Stage>
  );
};

export default PixiCanvas;

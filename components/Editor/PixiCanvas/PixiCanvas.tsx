import { Container, Sprite, Stage, Text, Graphics } from "@inlet/react-pixi";
import PIXI, {
  Graphics as GraphicsType,
  TextMetrics,
  TextStyle,
} from "pixi.js";
import { useCallback } from "react";
import { useAllObjects, useSingleObject } from "../../../stores/project";
import { IImageObject, ITextObject } from "../../../types/base";
import {
  onContainerDragEnd,
  onContainerDragMove,
  onContainerDragStart,
  onSpriteDragEnd,
  onSpriteDragMove,
  onSpriteDragStart,
} from "./drag";

const SIZE = { width: 800, height: 600 };

const PixiCanvas = ({ selectedPageId }: { selectedPageId: number }) => {
  const [getObjects, setObjects] = useAllObjects(selectedPageId);
  const objects = getObjects;

  return (
    <Stage
      width={SIZE.width}
      height={SIZE.height}
      options={{ backgroundAlpha: 0.2 }}
    >
      {objects.map((object) => {
        if (object) {
          if (object.type === "image") {
            console.log(object.positionX);
            return (
              <ImageObject
                object={object}
                pageId={selectedPageId}
                SIZE={SIZE}
              />
            );
          } else if (object.type === "text") {
            return (
              <TextContainer
                object={object}
                pageId={selectedPageId}
                SIZE={SIZE}
              />
            );
          }
        }
      })}
    </Stage>
  );
};

export default PixiCanvas;

const ImageObject = ({
  object,
  pageId,
  SIZE,
}: {
  object: Partial<IImageObject>;
  pageId: number;
  SIZE: { width: number; height: number };
}) => {
  const [_, setObject] = useSingleObject(object.id!, pageId);
  const dragEnd = (e: PIXI.InteractionEvent) => {
    const position = onSpriteDragEnd(e);
    setObject({ positionX: position.x, positionY: position.y });
  };

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
      mousedown={onSpriteDragStart}
      mouseup={dragEnd}
      mousemove={(e) => {
        onSpriteDragMove(e, SIZE);
      }}
      mouseupoutside={onSpriteDragEnd}
    />
  );
};

const TextContainer = ({
  object,
  pageId,
  SIZE,
}: {
  object: Partial<ITextObject>;
  pageId: number;
  SIZE: { width: number; height: number };
}) => {
  const [_, setObject] = useSingleObject(object.id!, pageId);
  const dragEnd = (e: PIXI.InteractionEvent) => {
    const position = onContainerDragEnd(e);
    setObject({ positionX: position.x, positionY: position.y });
  };

  // 텍스트의 스타일
  const style = new TextStyle({
    fontFamily: object.fontFamily,
    fontSize: object.fontSize,
    stroke: object.strokeColor || undefined,
    strokeThickness: object.strokeWidth,
    letterSpacing: object.letterSpacing,
    lineHeight: object.lineHeight,
    fill: object.color,
  });

  const textMetrics = TextMetrics.measureText(object.textContent || "", style); // 배경색을 제외한 텍스트 자체의 크기

  // Graphics를 그리는 함수
  const draw = useCallback(
    (g: GraphicsType) => {
      g.clear();
      // 테두리
      if (object.borderColor) {
        g.lineStyle(
          object.borderWidth || 0,
          Number("0x" + object.borderColor.substring(1)), // 색을 hex color로 표현
        );
      }
      // 배경색
      if (object.backgroundColor) {
        g.beginFill(Number("0x" + object.backgroundColor.substring(1)), 1);
      }
      // 배경 위치 및 크기
      if (object.positionX && object.positionY && object.strokeWidth) {
        g.drawRect(
          object.positionX,
          object.positionY,
          textMetrics.width + object.strokeWidth * 2,
          textMetrics.height + object.strokeWidth * 2,
        );
      }
    },
    [
      object.backgroundColor,
      object.borderColor,
      object.borderWidth,
      object.positionX,
      object.positionY,
      object.strokeWidth,
      textMetrics.height,
      textMetrics.width,
    ],
  );

  return (
    <Container
      interactive={true}
      buttonMode={true}
      mousedown={onContainerDragStart}
      mouseup={dragEnd}
      mousemove={(e) => {
        onContainerDragMove(e, SIZE);
      }}
      mouseupoutside={onContainerDragEnd}
    >
      {/* 텍스트의 배경색 표현 */}
      <Graphics draw={draw} />
      {/* 텍스트 표현 */}
      {object.positionX && object.positionY && (
        <Text
          key={object.id}
          x={object.positionX + (object.strokeWidth || 0)}
          y={object.positionY + (object.strokeWidth || 0)}
          text={object.textContent}
          interactive={true}
          buttonMode={true}
          style={style}
        />
      )}
    </Container>
  );
};

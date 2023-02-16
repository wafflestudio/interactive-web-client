import PIXI from "pixi.js";

interface Draggable extends PIXI.Sprite {
  data: PIXI.InteractionData | null;
  dragging: boolean;
}

export const onDragStart = (event: PIXI.InteractionEvent) => {
  const object = event.currentTarget as Draggable;

  object.anchor.set(
    (event.data.global.x - object.x) / object.width,
    (event.data.global.y - object.y) / object.height,
  );

  object.position.set(
    object.position.x + object.anchor.x * object.width,
    object.position.y + object.anchor.y * object.height,
  );

  object.alpha = 0.5;
  object.data = event.data;
  object.dragging = true;
};

export const onDragEnd = (event: PIXI.InteractionEvent) => {
  const object = event.currentTarget as Draggable;
  object.alpha = 1;
  object.dragging = false;
  object.data = null;

  object.position.set(
    object.position.x - object.anchor.x * object.width,
    object.position.y - object.anchor.y * object.height,
  );

  object.anchor.set(0, 0);
};

export const onDragMove = (event: PIXI.InteractionEvent) => {
  const object = event.currentTarget as Draggable;
  if (object.dragging && object.data) {
    const newPosition = object.data.getLocalPosition(object.parent);
    object.x = newPosition.x;
    object.y = newPosition.y;
  }
};

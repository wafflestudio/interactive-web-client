import PIXI from "pixi.js";

// Sprite나 개별 Text를 드래그할 시 (기본적으로 anchor 속성이 있는 오브젝트를 드래그할 시)
interface Draggable extends PIXI.Sprite {
  data: PIXI.InteractionData | null;
  dragging: boolean;
}

export const onDragStart = (event: PIXI.InteractionEvent) => {
  // 드래그 시작 시
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
  // 드래그 끝났을 때
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
  // 마우스를 클릭한 채로 움직일 때
  const object = event.currentTarget as Draggable;
  if (object.dragging && object.data) {
    const newPosition = object.data.getLocalPosition(object.parent);
    object.x = newPosition.x;
    object.y = newPosition.y;
  }
};

// Container를 드래그할 시 (직접 anchor 속성을 추가함)
interface ContainerDraggable extends PIXI.Container {
  data: PIXI.InteractionData | null;
  dragging: boolean;
  anchor: {
    x: number;
    y: number;
  };
}

export const onContainerDragStart = (event: PIXI.InteractionEvent) => {
  // 드래그 시작 시
  const object = event.currentTarget as ContainerDraggable;

  object.anchor = {
    x: (event.data.global.x - object.x) / object.width,
    y: (event.data.global.y - object.y) / object.height,
  };

  object.alpha = 0.5;
  object.data = event.data;
  object.dragging = true;
};

export const onContainerDragEnd = (event: PIXI.InteractionEvent) => {
  // 드래그 끝났을 때
  const object = event.currentTarget as ContainerDraggable;
  object.alpha = 1;
  object.dragging = false;
  object.data = null;

  object.anchor = { x: 0, y: 0 };
};

export const onContainerDragMove = (event: PIXI.InteractionEvent) => {
  // 마우스를 클릭한 채로 움직일 때
  const object = event.currentTarget as ContainerDraggable;
  if (object.dragging && object.data) {
    const newPosition = object.data.getLocalPosition(object.parent);
    object.x = newPosition.x - object.width * object.anchor.x;
    object.y = newPosition.y - object.height * object.anchor.y;
  }
};

import PIXI from "pixi.js";

// Sprite를 드래그할 시 (기본적으로 anchor 속성이 있는 오브젝트를 드래그할 시)
interface SpriteDraggable extends PIXI.Sprite {
  data: PIXI.InteractionData | null;
  dragging: boolean;
}

export const onSpriteDragStart = (event: PIXI.InteractionEvent) => {
  // 드래그 시작 시
  const object = event.currentTarget as SpriteDraggable;

  // 클릭했을 때 마우스 커서가 오브젝트에서 있는 위치(0~1 사이의 값)
  object.anchor.set(
    (event.data.global.x - object.x) / object.width,
    (event.data.global.y - object.y) / object.height,
  );
  // console.log(object.anchor)

  // 마우스 커서와 object의 위치가 클릭했을 때 그대로 있도록 함(position: coordinate of the object relative to the local coordinates of the parent)
  object.position.set(
    object.position.x + object.anchor.x * object.width,
    object.position.y + object.anchor.y * object.height,
  );

  object.alpha = 0.5; // 오브젝트의 투명도
  object.data = event.data;
  object.dragging = true;
};

export const onSpriteDragEnd = (event: PIXI.InteractionEvent) => {
  // 드래그 끝났을 때
  const object = event.currentTarget as SpriteDraggable;
  object.alpha = 1;
  object.dragging = false;
  object.data = null;

  object.position.set(
    object.position.x - object.anchor.x * object.width,
    object.position.y - object.anchor.y * object.height,
  );

  object.anchor.set(0);
};

export const onSpriteDragMove = (
  event: PIXI.InteractionEvent,
  SIZE: { width: number; height: number },
) => {
  // 마우스를 클릭한 채로 움직일 때
  const object = event.currentTarget as SpriteDraggable;
  const drop = () => {
    object.alpha = 1;
    object.dragging = false;
    object.data = null;

    object.position.set(
      object.position.x - object.anchor.x * object.width,
      object.position.y - object.anchor.y * object.height,
    );
    object.anchor.set(0);
  };
  if (object.dragging && object.data) {
    const newPosition = object.data.getLocalPosition(object.parent);
    object.x = newPosition.x;
    object.y = newPosition.y;

    if (newPosition.x < 0) {
      object.x = 20;
      drop();
    }
    if (newPosition.x > SIZE.width) {
      object.x = SIZE.width - 20;
      drop();
    }
    if (newPosition.y < 0) {
      object.y = 20;
      drop();
    }
    if (newPosition.y > SIZE.height) {
      object.y = SIZE.height - 20;
      drop();
    }
  }
};

// Container(Text + Graphics)를 드래그할 시 (직접 anchor 속성을 추가함)
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

export const onContainerDragMove = (
  event: PIXI.InteractionEvent,
  SIZE: { width: number; height: number },
) => {
  // 마우스를 클릭한 채로 움직일 때
  const object = event.currentTarget as ContainerDraggable;
  const drop = () => {
    object.alpha = 1;
    object.dragging = false;
    object.data = null;

    object.anchor = { x: 0, y: 0 };
  };
  if (object.dragging && object.data) {
    const newPosition = object.data.getLocalPosition(object.parent);
    object.x = newPosition.x - object.width * object.anchor.x;
    object.y = newPosition.y - object.height * object.anchor.y;

    if (newPosition.x < 0) {
      object.x = 20 - object.width * object.anchor.x;
      drop();
    }
    if (newPosition.x > SIZE.width) {
      object.x = SIZE.width - 20 - object.width * object.anchor.x;
      drop();
    }
    if (newPosition.y < 0) {
      object.y = 20 - object.height * object.anchor.y;
      drop();
    }
    if (newPosition.y > SIZE.height) {
      object.y = SIZE.height - 20 - object.height * object.anchor.y;
      drop();
    }
  }
};

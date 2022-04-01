import { GridScale, Scale } from "./physicsInterface";

export const collision = null;

export const contain = {
  detected: (container: Scale, item: Scale, strict = false) => {
    if (strict) {
      return false;
    } else {
      const midpoint = { x: item.x + item.w / 2, y: item.y + item.h / 2 };
      if (midpoint.x < container.x + container.w && midpoint.x > container.x) {
        if (
          midpoint.y < container.y + container.h &&
          midpoint.y > container.y
        ) {
          return true;
        }
      }
    }
    return false;
  },

  gridify: (container: GridScale, item: Scale) => {
    const gap = {
      column: container.w / (container.column + 1),
      row: container.h / (container.row + 1),
    };
    const ordinal = {
      column: Math.round((item.x - container.x) / gap.column),
      row: Math.round((item.y - container.y) / gap.row),
    };
    return { x: container.x + ordinal.column, y: container.y + ordinal.row };
  },
};

// 이렇게 사용하시면 됩니다
// if(contain.detected(container, item)){
//   gridify(container,item);
// }

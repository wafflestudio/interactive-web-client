import { GridPosition, GridScale, Scale } from "./physicsInterface";
import { AreaDataType, ObjectDataType } from "../../dummies/dummyInterface";
import { a } from "@react-spring/three";
import { object } from "prop-types";
import { VECTOR_SPEED } from "../animation/animationInterface";

export const scalify = {
  object: (obj: ObjectDataType) => ({
    x: obj.x,
    y: obj.y,
    w: obj.svgData.width,
    h: obj.svgData.height,
  }),
  area: (area: AreaDataType) => ({
    x: area.x,
    y: area.y,
    w: area.divData.width,
    h: area.divData.height,
  }),
  gridArea: (area: AreaDataType) => ({
    x: area.x,
    y: area.y,
    w: area.divData.width,
    h: area.divData.height,
    column: 5,
    row: 10,
  }),
};

export const collision = {
  //only for circle
  detected: (item: Scale, other: Scale) => {
    const squareDistance =
      (item.x - other.x) * (item.x - other.x) +
      (item.y - other.y) * (item.y - other.y);
    return (
      squareDistance <= (item.w / 2 + other.w / 2) * (item.w / 2 + other.w / 2)
    );
  },

  calculateSpeed: (item: Scale, itemSpeed: VECTOR_SPEED, other: Scale) => {
    const vCollision = { x: item.x - other.x, y: item.y - other.y };
    const distance = Math.sqrt(
      vCollision.x * vCollision.x + vCollision.y * vCollision.y,
    );
    const vCollisionNorm = {
      x: vCollision.x / distance,
      y: vCollision.y / distance,
    };
    const speed =
      itemSpeed.x * vCollisionNorm.x + itemSpeed.y * vCollisionNorm.y;
    return {
      x: speed * vCollisionNorm.x,
      y: speed * vCollisionNorm.y,
      scalar: Math.abs(speed),
    };
  },
};

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

  gridify: (container: GridScale, item: Scale): GridPosition => {
    const gap = {
      column: container.w / container.column,
      row: container.h / container.row,
    };
    const ordinal = {
      column: Math.floor((item.x + item.w / 2 - container.x) / gap.column) + 1,
      row: Math.floor((item.y + item.h / 2 - container.y) / gap.row) + 1,
    };
    return {
      x: container.x + (ordinal.column - 0.5) * gap.column - item.w / 2,
      y: container.y + (ordinal.row - 0.5) * gap.row - item.h / 2,
    };
  },
};

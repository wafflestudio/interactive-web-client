import { GridScale, Scale } from "./physicsInterface";
import {AreaDataType, ObjectDataType} from "../../dummies/dummyInterface";
import {a} from "@react-spring/three";
import {object} from "prop-types";

export const scalify = {
  object: (obj: ObjectDataType) => (
      {x: obj.x, y: obj.y, w: obj.svgData.width, h: obj.svgData.height}
  ),
  area: (area: AreaDataType) => (
      {x: area.x, y: area.y, w: area.divData.width, h: area.divData.height}
  ),
  gridArea: (area: AreaDataType) => (
      {x: area.x, y: area.y, w: area.divData.width, h: area.divData.height, column: 5, row: 10}
  ),
}

export const collision = {

}

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
      column: container.w / (container.column),
      row: container.h / (container.row),
    };
    const ordinal = {
      column: Math.floor((item.x + item.w/2 - container.x) / gap.column) + 1,
      row: Math.floor((item.y + item.h/2 - container.y) / gap.row) + 1,
    };
    console.log(ordinal)
    return { x: container.x + (ordinal.column - 0.5) * gap.column - item.w/2,
      y: container.y + (ordinal.row - 0.5) * gap.row - item.h/2 };
  },
};

// 이렇게 사용하시면 됩니다
// if(contain.detected(container, item)){
//   gridify(container,item);
// }

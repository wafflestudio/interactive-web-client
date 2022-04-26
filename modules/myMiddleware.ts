import { Middleware } from "redux";
import { GridPosition } from "../functions/physics/physicsInterface";
import { collision, contain, scalify } from "../functions/physics/basics";
import { AreaDataType, ObjectDataType } from "../dummies/dummyInterface";
import objects, { UPDATE_OBJECT, updateObject } from "./objects";
import { MOVE_DRAG } from "./drag";
import { addAnimateCollision, addAnimateGridSlide } from "./animate";

const myMiddleware: Middleware<unknown, any, any> =
  (store) => (next) => (action) => {
    const { type, payload } = action;

    let result;

    // 드래그 끝날 때의 updateObject에서 실행
    if (type === UPDATE_OBJECT && payload === store.getState().drag.target) {
      let gridPosition: GridPosition | undefined;
      store.getState().areas.forEach((area: AreaDataType) => {
        // 지정된 영역 안에서 드래그 끝났을 때, 가장 가까운 행렬 계산해서 위치 조정
        if (
          contain.detected(
            scalify.area(area),
            scalify.object(store.getState().drag.target),
          )
        ) {
          gridPosition = contain.gridify(
            scalify.gridArea(area),
            scalify.object(store.getState().drag.target),
          );
          result = next({
            ...action,
            payload: {
              ...action.payload,
              x: gridPosition.x,
              y: gridPosition.y,
            },
          });
        }
      });
    }

    // 드래그 시 충돌 감지
    if (type === MOVE_DRAG) {
      const dragTarget = store.getState().drag.target;
      store
        .getState()
        .objects.filter(
          (object: ObjectDataType) =>
            object.id !== dragTarget.id && object.isVisible,
        )
        .forEach((fixedObj: ObjectDataType) => {
          if (
            collision.detected(
              scalify.object(dragTarget),
              scalify.object(fixedObj),
            )
          ) {
            const areasIncluded = store
              .getState()
              .areas.filter((area: AreaDataType) =>
                contain.detected(scalify.area(area), scalify.object(fixedObj)),
              );

            // 지정된 영역 밖에서 animation (collision)
            if (!areasIncluded.length) {
              const vSpeed = collision.calculateSpeed(
                scalify.object(dragTarget),
                { x: payload.speedX, y: payload.speedY },
                scalify.object(fixedObj),
              );
              console.log("initial speed: ", vSpeed);
              store.dispatch(
                addAnimateCollision({ target: fixedObj, vSpeed: vSpeed }),
              );
              store.dispatch(updateObject({ ...fixedObj, isVisible: false }));
            } else {
              // 지정된 영역 안에서 animation (grid slide)
            }
          }
        });
    }

    if (!result) {
      result = next(action);
    }

    return result;
  };

export default myMiddleware;

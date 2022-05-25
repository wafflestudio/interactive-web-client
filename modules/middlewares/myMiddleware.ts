import { Middleware } from "redux";
import { drawEllipse } from "../../components/dev/DynamicCanvas/previews/canvasRect";
import { AreaDataType, ObjectDataType } from "../../dummies/dummyInterface";
import { CollisionAnimation } from "../../functions/animation/animationInterface";
import { fps, friction } from "../../functions/animation/environment";
import { collision, contain, scalify } from "../../functions/physics/basics";
import { GridPosition } from "../../functions/physics/physicsInterface";
import {
  addAnimateCollision,
  removeAnimateCollision,
  updateTargetCollision,
} from "../animate";
import { RENDER_REF, toggleCanvasRef } from "../canvasRef";
import { MOVE_DRAG } from "../drag";
import staticObjects, { UPDATE_OBJECT, updateObject } from "../staticObjects";

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
            object.id !== dragTarget.id && object.visibility,
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
              // console.log("initial speed: ", vSpeed);
              store.dispatch(toggleCanvasRef(true));
              store.dispatch(
                addAnimateCollision({ target: fixedObj, vSpeed: vSpeed }),
              );
              store.dispatch(updateObject({ ...fixedObj, visibility: false }));
            } else {
              // 지정된 영역 안에서 animation (grid slide)
            }
          }
        });
    }

    //다시 그리기
    if (type === RENDER_REF) {
      const ref = store.getState().canvasRef.ref;
      const ctx = ref.current.getContext("2d");
      const animateCollisionArr: CollisionAnimation[] =
        store.getState().animate.collisionArr;

      if (animateCollisionArr.length > 0) {
        ctx.clearRect(0, 0, ref.current.width, ref.current.height);

        if (!!animateCollisionArr.length && ctx) {
          animateCollisionArr.forEach((animation) => {
            // 속도가 1보다 작을 때 멈춤
            if (animation.vSpeed.scalar < 0.5) {
              store.dispatch(updateObject(animation.target));
              store.dispatch(removeAnimateCollision(animation.target));
              store.dispatch(toggleCanvasRef(false));
            } else {
              const newSpeedX =
                (Math.max(
                  animation.vSpeed.scalar -
                    (Math.sign(animation.vSpeed.scalar) * friction) / fps,
                  0,
                ) *
                  animation.vSpeed.x) /
                animation.vSpeed.scalar;
              const newSpeedY =
                (Math.max(
                  animation.vSpeed.scalar -
                    (Math.sign(animation.vSpeed.scalar) * friction) / fps,
                  0,
                ) *
                  animation.vSpeed.y) /
                animation.vSpeed.scalar;

              store.dispatch(
                updateTargetCollision({
                  ...animation,
                  target: {
                    ...animation.target,
                    geometry: {
                      ...animation.target.geometry,
                      x: animation.target.geometry.x + animation.vSpeed.x,
                      y: animation.target.geometry.y + animation.vSpeed.y,
                    },
                  },
                  vSpeed: {
                    x: newSpeedX,
                    y: newSpeedY,
                    scalar: Math.sqrt(
                      newSpeedX * newSpeedX + newSpeedY * newSpeedY,
                    ),
                  },
                }),
              );
            }
          });
          animateCollisionArr.forEach((animation) => {
            drawEllipse(
              ctx,
              {
                x: animation.target.geometry.x,
                y: animation.target.geometry.y,
                w: animation.target.geometry.w,
                h: animation.target.geometry.h,
              },
              animation.target.svgData.fill
                ? animation.target.svgData.fill
                : "rgba(0,0,0,0)",
              animation.target.svgData.stroke
                ? animation.target.svgData.stroke
                : "rgba(255,255,255,255)",
            );
          });
        }
      }
    }
    if (!result) {
      result = next(action);
    }

    return result;
  };

export default myMiddleware;

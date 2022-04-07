import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../modules";
import styles from "./AnimationCanvas.module.scss";
import {
  removeAnimateCollision,
  updateTargetCollision,
} from "../../../modules/animate";
import { drawEllipse } from "../DynamicCanvas/previews/canvasRect";
import { fps, friction } from "../../../functions/animation/environment";
import { updateObject } from "../../../modules/objects";

const AnimationCanvas = () => {
  const dispatch = useDispatch();
  const animateCollisionArr = useSelector(
    (state: RootState) => state.animate.collisionArr,
  );
  const animateGridSlideArr = useSelector(
    (state: RootState) => state.animate.gridSlideArr,
  );
  const areas = useSelector((state: RootState) => state.areas);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const animationCanvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = animationCanvasRef.current?.getContext("2d");

  useEffect(() => {
    if (!!animateCollisionArr.length && ctx) {
      animateCollisionArr.forEach((animation) => {
        console.log("draw", animation.target);
        drawEllipse(
          ctx,
          {
            x: animation.target.x,
            y: animation.target.y,
            w: animation.target.svgData.width,
            h: animation.target.svgData.height,
          },
          animation.target.svgData.fill
            ? animation.target.svgData.fill
            : "rgba(0,0,0,0)",
        );
      });

      //1초마다 렌더되도록 설정 (주기 조절 가능)
      setTimeout(() => {
        if (animationCanvasRef.current) {
          ctx.clearRect(
            0,
            0,
            animationCanvasRef.current.width,
            animationCanvasRef.current.height,
          );

          animateCollisionArr.forEach((animation) => {
            // 속도가 1보다 작을 때 멈춤
            if (animation.vSpeed.scalar < 0.5) {
              dispatch(updateObject(animation.target));
              dispatch(removeAnimateCollision(animation.target));
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

              dispatch(
                updateTargetCollision({
                  ...animation,
                  target: {
                    ...animation.target,
                    x: animation.target.x + animation.vSpeed.x,
                    y: animation.target.y + animation.vSpeed.y,
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
        }
      }, 1000 / fps);
    }
  }, [animateCollisionArr]);

  useEffect(() => {
    if (animationCanvasRef.current !== null) {
      animationCanvasRef.current.width = animationCanvasRef.current.clientWidth;
      animationCanvasRef.current.height =
        animationCanvasRef.current.clientHeight;
    }
  });

  return (
    <div
      ref={canvasWrapperRef}
      className={`${styles.animationCanvas} ${
        !!animateGridSlideArr.length || !!animateCollisionArr.length
          ? ``
          : styles.off
      }`}
    >
      <canvas ref={animationCanvasRef} />
    </div>
  );
};

export default AnimationCanvas;

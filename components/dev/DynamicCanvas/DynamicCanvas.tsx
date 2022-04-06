import { Canvas, useFrame } from "@react-three/fiber";
import {MouseEventHandler, useEffect, useRef, useState} from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../modules";
import { endDrag, moveDrag } from "../../../modules/drag";
import { updateObject } from "../../../modules/objects";
import { drawEllipse } from "./previews/canvasRect";
import { RectMesh } from "./previews/RectMesh";
import styles from "./DynamicCanvas.module.scss";
import { contain, scalify } from "../../../functions/physics/basics";
import { inferTo } from "@react-spring/core";
import { getRawProjectId } from "next/dist/telemetry/project-id";

const DynamicCanvas = () => {
  const dispatch = useDispatch();
  const dragTarget = useSelector((state: RootState) => state.drag.target);
  const animateTargetArr = useSelector(
    (state: RootState) => state.animate.targetArr,
  );
  const objects = useSelector((state: RootState) => {
    return state.objects;
  });
  const fixedObjs = objects.filter((object) => object.id != dragTarget.id);
  const areas = useSelector((state: RootState) => state.areas);
  const isDragOn = useSelector((state: RootState) => state.drag.isOn);
  const isAnimateOn = useSelector((state: RootState) => state.animate.isOn);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const testTypeNumber = useSelector((state: RootState) => state.testType);
  const [throttle, setThrottle] = useState<boolean>(false);

  const handleDragEnd : MouseEventHandler<HTMLDivElement> = (e) => {
    batch(() => {
      let gridPosition;
      areas.map((area) => {
        if (contain.detected(scalify.area(area), scalify.object(dragTarget))) {
          gridPosition = contain.gridify(
            scalify.gridArea(area),
            scalify.object(dragTarget),
          );
        }
      });
      if (gridPosition){
        dispatch(updateObject({...dragTarget, x: gridPosition.x, y: gridPosition.y}))
      } else {
        dispatch(updateObject(dragTarget));
      }
      dispatch(endDrag());
    });
  };

  useEffect(() => {
    if (canvasRef.current !== null) {
      canvasRef.current.width = canvasRef.current.clientWidth;
      canvasRef.current.height = canvasRef.current.clientHeight;
    }
  });

  useEffect(() => {
    if (canvasRef.current !== null) {
      const ctx = canvasRef.current.getContext("2d");
      if (isAnimateOn && ctx) {
        animateTargetArr.forEach((item) => {
          drawEllipse(
            ctx,
            {
              x: item.x,
              y: item.y,
              w: item.svgData.width,
              h: item.svgData.height,
            },
            item.svgData.fill ? item.svgData.fill : "rgba(0,0,0,0)",
          );
        });
      }
      if (isDragOn && ctx) {
        // if (fixedObjs.map((obj)=>{
        //   contain.detected(obj, dragTarget)
        // }))
        drawEllipse(
          ctx,
          {
            x: dragTarget.x,
            y: dragTarget.y,
            w: dragTarget.svgData.width,
            h: dragTarget.svgData.height,
          },
          dragTarget.svgData.fill ? dragTarget.svgData.fill : "rgba(0,0,0,0)",
        );
      }
    }
  }, [dragTarget]);

  return (
    <div
      ref={canvasWrapperRef}
      className={`${styles.dynamicCanvas} ${isDragOn ? `` : styles.off}`}
      onMouseMove={(e) => {
        if (!throttle) {
          const x = e.nativeEvent.offsetX;
          const y = e.nativeEvent.offsetY;
          dispatch(moveDrag(x, y));
          //마우스 이벤트 쓰로틀링
          // setThrottle(true);
          // setTimeout(() => {
          //   setThrottle(false);
          // }, 10);
        }
      }}
      onMouseUp={handleDragEnd}
    >
      {testTypeNumber === 0 && <canvas ref={canvasRef} />}
      {testTypeNumber === 1 && (
        <Canvas camera={{ position: [0, 0, 10] }}>
          <RectMesh
            fixedObjs={fixedObjs}
            dragTarget={dragTarget}
            canvasSize={
              canvasWrapperRef.current
                ? {
                    width: canvasWrapperRef.current.clientWidth,
                    height: canvasWrapperRef.current.clientHeight,
                  }
                : undefined
            }
          />
        </Canvas>
      )}
    </div>
  );
};

export default DynamicCanvas;

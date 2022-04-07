import { Canvas } from "@react-three/fiber";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../modules";
import { endDrag, moveDrag } from "../../../modules/drag";
import { updateObject } from "../../../modules/objects";
import { drawEllipse } from "./previews/canvasRect";
import { RectMesh } from "./previews/RectMesh";
import styles from "./DynamicCanvas.module.scss";

const DynamicCanvas = () => {
  const dispatch = useDispatch();
  const dragTarget = useSelector((state: RootState) => state.drag.target);
  const areas = useSelector((state: RootState) => state.areas);
  const isDragOn = useSelector((state: RootState) => state.drag.isOn);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const testTypeNumber = useSelector((state: RootState) => state.testType);
  const [throttle, setThrottle] = useState<boolean>(false);

  const handleDragEnd: MouseEventHandler<HTMLDivElement> = (e) => {
    batch(() => {
      dispatch(updateObject(dragTarget));
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

      if (isDragOn && ctx) {
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
          dispatch(moveDrag(x, y, e.movementX, e.movementY));
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

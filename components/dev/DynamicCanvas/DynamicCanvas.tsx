import { Canvas } from "@react-three/fiber";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../modules";
import { renderCanvasRef, saveCanvasRef } from "../../../modules/canvasRef";
import { endDrag, moveDrag } from "../../../modules/drag";
import { updateObject } from "../../../modules/staticObjects";
import { drawEllipse } from "./previews/canvasRect";
import { RectMesh } from "./previews/RectMesh";
import styles from "./DynamicCanvas.module.scss";

const DynamicCanvas = () => {
  const dispatch = useDispatch();

  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const testTypeNumber = useSelector((state: RootState) => state.testType);
  const [throttle, setThrottle] = useState<boolean>(false);
  const refIsOn = useSelector((state: RootState) => state.canvasRef.exist);

  const render = () => {
    dispatch(renderCanvasRef());
    window.requestAnimationFrame(render);
  };

  const handleDragEnd: MouseEventHandler<HTMLDivElement> = (e) => {
    batch(() => {
      dispatch(endDrag());
    });
  };
  useEffect(() => {
    if (canvasRef.current !== null) {
      canvasRef.current.width = canvasRef.current.clientWidth;
      canvasRef.current.height = canvasRef.current.clientHeight;
      dispatch(saveCanvasRef(canvasRef));
    }
  }, [canvasRef, refIsOn]);

  useEffect(() => {
    render();
  }, []);

  return (
    <div
      ref={canvasWrapperRef}
      className={`${styles.dynamicCanvas} ${refIsOn ? `` : styles.off}`}
      onMouseMove={(e) => {
        if (!throttle) {
          const x = e.nativeEvent.offsetX;
          const y = e.nativeEvent.offsetY;
          dispatch(moveDrag(x, y, e.movementX, e.movementY));
          // 마우스 이벤트 쓰로틀링
          setThrottle(true);
          setTimeout(() => {
            setThrottle(false);
          }, 5);
        }
      }}
      onMouseUp={handleDragEnd}
    >
      {testTypeNumber === 0 && <canvas ref={canvasRef} />}
    </div>
  );
};

export default DynamicCanvas;

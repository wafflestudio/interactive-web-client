import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../modules";
import { setId, setXPos, setYPos } from "../../../modules/addModal";
import { renderCanvasRef, saveCanvasRef } from "../../../modules/canvasRef";
import AddModal from "../Modal/AddModal/AddModal";
import styles from "./DynamicCanvas.module.scss";

const DynamicCanvas = () => {
  const dispatch = useDispatch();

  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrag = useSelector((state: RootState) => state.drag.isOn);

  const draw = () => {
    dispatch(renderCanvasRef());
    if (isDrag) {
      window.requestAnimationFrame(draw);
    }
  };

  useEffect(() => {
    if (canvasRef.current !== null) {
      canvasRef.current.width = canvasRef.current.clientWidth;
      canvasRef.current.height = canvasRef.current.clientHeight;
      // dispatch(saveCanvasRef(canvasRef));
    }
  }, [canvasRef]);

  useEffect(() => {
    draw();
  }, [isDrag]);

  return (
    <div ref={canvasWrapperRef} className={`${styles.dynamicCanvas}`}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default DynamicCanvas;

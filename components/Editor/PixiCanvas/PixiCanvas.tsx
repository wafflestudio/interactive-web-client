import PIXI from "pixi.js";
import { useEffect, useRef } from "react";
import { createPixiApp } from "../../../functions/pixi/pixiGraphicFunction";
import styles from "./PixiCanvas.module.scss";

const PixiCanvas = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapperRef.current) {
      const { clientWidth, clientHeight } = wrapperRef.current;
      wrapperRef.current.appendChild(
        createPixiApp(clientWidth, clientHeight).view,
      );
    }
  }, []);

  return <div className={styles.wrapper} ref={wrapperRef} />;
};

export default PixiCanvas;

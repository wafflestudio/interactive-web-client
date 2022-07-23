import { Stage } from "@inlet/react-pixi";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { PixiDataType } from "../../../dummies/dummyInterface";
import PixiGraphic from "../../../functions/pixi/PixiGraphic";
import { RootState } from "../../../modules";
import styles from "./DynamicCanvas.module.scss";

const DynamicCanvas = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [stageSize, setStateSize] = useState<{ w: number; h: number }>({
    w: 0,
    h: 0,
  });
  const pixiGraphics = useSelector((state: RootState) => state.pixiGraphics);

  useEffect(() => {
    if (wrapperRef.current) {
      setStateSize({
        w: wrapperRef.current?.clientWidth,
        h: wrapperRef.current?.clientHeight,
      });
    }
  }, [wrapperRef]);

  return (
    <div className={styles.DynamicCanvas} ref={wrapperRef}>
      <Stage
        width={stageSize.w}
        height={stageSize.h}
        options={{ backgroundAlpha: 0 }}
      >
        {pixiGraphics.map((item: PixiDataType, index: number) => {
          return <PixiGraphic key={index} data={item} />;
        })}
      </Stage>
    </div>
  );
};

export default DynamicCanvas;

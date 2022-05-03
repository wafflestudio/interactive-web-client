import { useEffect } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { sampleAreaDummy } from "../../../dummies/sampleAreaDummy";
import { sampleObjectDummy } from "../../../dummies/sampleObjectDummy";
import { RootState } from "../../../modules";
import { saveAreas } from "../../../modules/areas";
import { endDrag, moveDrag } from "../../../modules/drag";
import { saveObjects } from "../../../modules/staticObjects";
import SampleArea from "../SampleDiv/SampleDiv";
import SampleSvg from "../SampleSvg/SampleSvg";
import styles from "./StaticContainer.module.scss";

const StaticContainer = () => {
  const dispatch = useDispatch();
  const staticObjects = useSelector((state: RootState) => {
    return state.staticObjects;
  });
  const areas = useSelector((state: RootState) => {
    return state.areas;
  });
  const isDrag = useSelector((state: RootState) => state.drag.isOn);

  //API 호출을 통한 데이터 로드를 대신하는 부분
  useEffect(() => {
    batch(() => {
      dispatch(saveObjects(sampleObjectDummy));
      dispatch(saveAreas(sampleAreaDummy));
    });
  }, []);

  return (
    <div
      className={styles.container}
      onMouseMove={(e) => {
        if (isDrag) {
          const x = e.nativeEvent.offsetX;
          const y = e.nativeEvent.offsetY;
          dispatch(moveDrag(x, y, e.movementX, e.movementY));
        }
      }}
      onMouseUp={() => {
        if (isDrag) {
          dispatch(endDrag());
        }
      }}
    >
      {areas.map((item, index) => {
        return <SampleArea key={index} item={item} />;
      })}
      {staticObjects.map((item, index) => {
        return <SampleSvg key={index} item={item} />;
      })}
    </div>
  );
};

export default StaticContainer;

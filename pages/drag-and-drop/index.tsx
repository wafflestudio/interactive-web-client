import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DynamicCanvas from "../../components/dev/DynamicCanvas/DynamicCanvas";
import Indicator from "../../components/dev/Indicator/Indicator";
import SampleArea from "../../components/dev/SampleDiv/SampleDiv";
import SampleSvg from "../../components/dev/SampleSvg/SampleSvg";
import { sampleAreaDummy } from "../../dummies/sampleAreaDummy";
import { sampleObjectDummy } from "../../dummies/sampleObjectDummy";
import { RootState } from "../../modules";
import { saveAreas } from "../../modules/areas";
import { saveObjects, updateObject } from "../../modules/objects";
import styles from "./DragAndDrop.module.scss";

const DragAndDrop = () => {
  const dispatch = useDispatch();
  //redux 에서 모든 objects 의 배열 가져옴
  const objects = useSelector((state: RootState) => {
    return state.objects;
  });
  const areas = useSelector((state: RootState) => {
    return state.areas;
  });

  //API 호출을 통한 데이터 로드를 대신하는 부분
  useEffect(() => {
    dispatch(saveObjects(sampleObjectDummy));
    dispatch(saveAreas(sampleAreaDummy));
  }, []);

  return (
    <>
      <Indicator />
      <div className={styles.container}>
        {areas.map((item, index) => {
          return <SampleArea key={index} item={item} />;
        })}
        {objects.map((item, index) => {
          return <SampleSvg key={index} item={item} />;
        })}
      </div>
      <DynamicCanvas />
    </>
  );
};

export default DragAndDrop;

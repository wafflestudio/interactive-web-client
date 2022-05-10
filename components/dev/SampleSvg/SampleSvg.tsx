import { batch, useDispatch } from "react-redux";
import { ObjectDataType } from "../../../dummies/dummyInterface";
import { endDrag, moveDrag, startDrag } from "../../../modules/drag";
import { updateObject } from "../../../modules/staticObjects";
import styles from "./SampleSvg.module.scss";
import { openSimpleInfoModal } from "../../../modules/modal";

interface SampleSvgProps {
  key: number;
  item: ObjectDataType;
}

//objects에 저장된 데이터를 바탕으로 svg 엘리먼트를 만들어 렌더합니다

const SampleSvg = ({ item }: SampleSvgProps) => {
  const dispatch = useDispatch();
  const geometry = item.geometry;
  const style = {
    width: geometry.w,
    height: geometry.h,
    left: geometry.x,
    top: geometry.y,
  };

  return (
    <svg
      className={`${styles.sampleSvg} ${item.visibility ? `` : styles.off}`}
      style={style}
    >
      <ellipse
        cx={`${geometry.w / 2}px`}
        cy={`${geometry.h / 2}px`}
        rx={`${geometry.w / 2}px`}
        ry={`${geometry.h / 2}px`}
        fill={item.svgData.fill}
        onMouseDown={(e) => {
          console.log("Click Success");
          batch(() => {
            dispatch(updateObject({ ...item, visibility: false }));
            dispatch(
              startDrag(item, e.nativeEvent.offsetX, e.nativeEvent.offsetY),
            );
            dispatch(openSimpleInfoModal(item));
          });
        }}
      />
    </svg>
  );
};

export default SampleSvg;

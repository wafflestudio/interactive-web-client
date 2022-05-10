import { AreaDataType } from "../../../dummies/dummyInterface";
import styles from "./SampleDiv.module.scss";

interface SampleDivProps {
  key: number;
  item: AreaDataType;
}

const SampleDiv = ({ item }: SampleDivProps) => {
  const geometry = item.geometry;
  const style = {
    width: geometry.w,
    height: geometry.h,
    left: geometry.x,
    top: geometry.y,
    border: `2px solid ${item.divData.stroke}`,
    backgroundColor: item.divData.fill,
  };

  return <div className={`${styles.default} ${styles.area}`} style={style} />;
};

export default SampleDiv;

import { AreaDataType } from "../../../dummies/dummyInterface";
import styles from "./SampleDiv.module.scss";

interface SampleDivProps {
  key: number;
  item: AreaDataType;
}

const SampleDiv = ({ item }: SampleDivProps) => {
  const style = {
    width: item.divData.width,
    height: item.divData.height,
    left: item.x,
    top: item.y,
    border: `2px solid ${item.divData.stroke}`,
    backgroundColor: item.divData.fill,
  };

  return <div className={`${styles.default} ${styles.area}`} style={style} />;
};

export default SampleDiv;

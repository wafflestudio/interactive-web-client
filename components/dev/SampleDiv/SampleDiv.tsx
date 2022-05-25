import { MouseEventHandler, useState } from "react";
import { AreaDataType } from "../../../dummies/dummyInterface";
import AddModal from "../Modal/AddModal/AddModal";
import styles from "./SampleDiv.module.scss";

interface SampleDivProps {
  key: number;
  item: AreaDataType;
}

const SampleDiv = ({ item }: SampleDivProps) => {
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [rightModal, setRightModal] = useState(false);
  const [addModal, setAddModal] = useState(false);

  const geometry = item.geometry;
  const style = {
    width: geometry.w,
    height: geometry.h,
    left: geometry.x,
    top: geometry.y,
    border: `2px solid ${item.divData.stroke}`,
    backgroundColor: item.divData.fill,
  };

  const onRightClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if (!addModal) {
      setPosX(e.pageX);
      setPosY(e.pageY);
      setRightModal(true);
    }
  };

  const closeRightModal = () => setRightModal(false);

  const onAddBead = () => {
    setAddModal(true);
    setRightModal(false);
  };

  return (
    <div
      className={`${styles.default} ${styles.area}`}
      style={style}
      onContextMenu={onRightClick}
      onClick={closeRightModal}
    >
      {rightModal ? (
        <div
          className={styles.rightModal}
          style={{ top: `${posY - 23}px`, left: `${posX - 22}px` }}
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onAddBead}>추가하기</button>
        </div>
      ) : null}
      {addModal ? <AddModal setAddModal={setAddModal} /> : null}
    </div>
  );
};

export default SampleDiv;

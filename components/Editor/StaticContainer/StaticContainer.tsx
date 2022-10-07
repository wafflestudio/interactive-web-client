import { MouseEventHandler, useEffect, useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { sampleAreaDummy } from "../../../dummies/sampleAreaDummy";
import { sampleObjectDummy } from "../../../dummies/sampleObjectDummy";
import { interactDrag } from "../../../hooks/interactionHooks";
import { RootState } from "../../../modules";
import { setId, setXPos, setYPos } from "../../../modules/addModal";
import { saveAreas } from "../../../modules/areas";
import { endDrag, moveDrag } from "../../../modules/drag";
import { saveObjects } from "../../../modules/staticObjects";
import AddModal from "../../dev/Modal/AddModal/AddModal";
import SampleSvg from "../SampleSvg/SampleSvg";
import styles from "./StaticContainer.module.scss";

const StaticContainer = () => {
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [rightModal, setRightModal] = useState(false);
  const [addModal, setAddModal] = useState(false);

  const { id } = useSelector((state: RootState) => state.addModal);

  const dispatch = useDispatch();
  const staticObjects = useSelector((state: RootState) => {
    return state.staticObjects;
  });
  const isDrag = useSelector((state: RootState) => state.drag.isOn);
  //API 호출을 통한 데이터 로드를 대신하는 부분
  useEffect(() => {
    batch(() => {
      dispatch(saveObjects(sampleObjectDummy));
      dispatch(saveAreas(sampleAreaDummy));
    });
  }, []);

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
    batch(() => {
      dispatch(setXPos(posX));
      dispatch(setYPos(posY));
      dispatch(setId(id + 1));
    });
    setAddModal(true);
    setRightModal(false);
  };

  return (
    <div
      className={styles.container}
      onMouseMove={(e) => {
        isDrag && interactDrag().update(e);
      }}
      onMouseUp={(e) => {
        isDrag && interactDrag().end(e);
      }}
      onContextMenu={onRightClick}
      onClick={closeRightModal}
    >
      {staticObjects.map((item, index) => {
        return <SampleSvg key={index} item={item} />;
      })}
      {rightModal ? (
        <div
          className={styles.rightModal}
          style={{ top: `${posY}px`, left: `${posX}px` }}
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onAddBead}>추가하기</button>
        </div>
      ) : null}
      {addModal ? <AddModal setAddModal={setAddModal} /> : null}
    </div>
  );
};

export default StaticContainer;

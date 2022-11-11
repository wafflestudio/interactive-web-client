import { ChangeEventHandler, useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { ELLIPSE, IMAGE, RECT } from "../../../../constants/constants";
import { RootState } from "../../../../modules";
import {
  setFill,
  setHeight,
  setImage,
  setShape,
  setSrc,
  setStroke,
  setWidth,
} from "../../../../modules/addModal";

import styles from "./AddModal.module.scss";

const AddShape = () => {
  const [previewWidth, setPreviewWidth] = useState(150);
  const [previewHeight, setPreviewHeight] = useState(150);

  const { geometry } = useSelector((state: RootState) => state.addModal);

  const dispatch = useDispatch();

  const onShapeChange: ChangeEventHandler<HTMLSelectElement> = ({ target }) => {
    if (target.value !== IMAGE)
      batch(() => {
        dispatch(setSrc(undefined));
        dispatch(setImage(undefined));
      });

    setPreviewWidth(150);
    setPreviewHeight(150);
    if (target.value === RECT || target.value === ELLIPSE) {
      const validShapeInput = target.value;
      batch(() => {
        dispatch(setWidth(150));
        dispatch(setHeight(150));
        dispatch(setShape(validShapeInput));
      });
    }
  };

  const onWidthChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    if (typeof parseInt(target.value) === "number")
      setPreviewWidth(parseInt(target.value));
  };
  const onHeightChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    if (typeof parseInt(target.value) === "number")
      setPreviewHeight(parseInt(target.value));
  };

  const onSaveGeometry = () => {
    batch(() => {
      dispatch(setWidth(previewWidth));
      dispatch(setHeight(previewHeight));
    });
  };

  const onStrokeChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    if (typeof parseInt(target.value) === "number")
      dispatch(setStroke(target.value));
  };
  const onFillChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    if (typeof parseInt(target.value) === "number")
      dispatch(setFill(target.value));
  };

  return (
    <>
      <label htmlFor="shape">
        모양
        <select id="shape" value={svgData.svgType} onChange={onShapeChange}>
          <option value={RECT}>네모</option>
          <option value={ELLIPSE}>동그라미</option>
          <option value={IMAGE}>이미지</option>
        </select>
      </label>
      {svgData.svgType === RECT ? (
        <>
          <label htmlFor="width">
            가로
            <input
              type="number"
              id="width"
              value={previewWidth}
              min={1}
              onChange={onWidthChange}
              onBlur={onSaveGeometry}
            />
          </label>
          <label htmlFor="height">
            세로
            <input
              type="number"
              id="height"
              value={previewHeight}
              min={1}
              onChange={onHeightChange}
              onBlur={onSaveGeometry}
            />
          </label>
        </>
      ) : null}
      {svgData.svgType === ELLIPSE ? (
        <>
          <label htmlFor="cx">
            rx
            <input
              type="number"
              id="cx"
              value={previewWidth}
              min={1}
              onChange={onWidthChange}
              onBlur={onSaveGeometry}
            />
          </label>
          <label htmlFor="cy">
            ry
            <input
              type="number"
              id="cy"
              value={previewHeight}
              min={1}
              onChange={onHeightChange}
              onBlur={onSaveGeometry}
            />
          </label>
        </>
      ) : null}
      {svgData.svgType !== IMAGE ? (
        <button onClick={onSaveGeometry}>설정</button>
      ) : null}
      {svgData.svgType !== IMAGE ? (
        <>
          <label htmlFor="stroke">
            테두리
            <input
              type="color"
              id="stroke"
              value={svgData.stroke}
              onChange={onStrokeChange}
            />
          </label>
          <label htmlFor="fill">
            배경색
            <input
              type="color"
              id="fill"
              value={svgData.fill}
              onChange={onFillChange}
            />
          </label>
          <div
            className={`${styles.shapePreview} ${
              svgData.svgType === ELLIPSE ? styles.circle : ""
            }`}
            style={{
              border: `2px solid ${svgData.stroke || "black"}`,
              background: `${svgData.fill || "transparent"}`,
              width: `${(geometry.w / geometry.h) * 150 || 150}px`,
            }}
          ></div>
        </>
      ) : null}
    </>
  );
};

export default AddShape;

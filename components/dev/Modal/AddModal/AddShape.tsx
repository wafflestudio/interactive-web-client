import { ChangeEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ELLIPSE, RECT } from "../../../../constants/constants";
import { RootState } from "../../../../modules";
import {
  setFill,
  setHeight,
  setShape,
  setStroke,
  setWidth,
} from "../../../../modules/addModal";

import styles from "./AddModal.module.scss";

const AddShape = ({ imageUrl }: { imageUrl: string }) => {
  const { svgData, geometry } = useSelector(
    (state: RootState) => state.addModal,
  );

  const dispatch = useDispatch();

  const onShapeChange: ChangeEventHandler<HTMLSelectElement> = ({ target }) =>
    dispatch(setShape(target.value));

  const onWidthChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    if (typeof parseInt(target.value) === "number")
      dispatch(setWidth(parseInt(target.value)));
  };
  const onHeightChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    if (typeof parseInt(target.value) === "number")
      dispatch(setHeight(parseInt(target.value)));
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
        </select>
      </label>
      {svgData.svgType === RECT ? (
        <>
          <label htmlFor="width">
            가로
            <input
              type="number"
              id="width"
              value={geometry.w}
              min={1}
              onChange={onWidthChange}
            />
          </label>
          <label htmlFor="height">
            세로
            <input
              type="number"
              id="height"
              value={geometry.h}
              min={1}
              onChange={onHeightChange}
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
              value={geometry.w}
              min={1}
              onChange={onWidthChange}
            />
          </label>
          <label htmlFor="cy">
            ry
            <input
              type="number"
              id="cy"
              value={geometry.h}
              min={1}
              onChange={onHeightChange}
            />
          </label>
        </>
      ) : null}
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
        className={`${styles.imageContainer} ${
          svgData.svgType === ELLIPSE ? styles.circle : ""
        }`}
        style={{
          border: `2px solid ${svgData.stroke || "black"}`,
          background: `${svgData.fill || "transparent"}`,
          width: `${(geometry.w / geometry.h) * 150 || 150}px`,
        }}
      >
        {imageUrl.length !== 0 ? <img src={imageUrl} /> : null}
      </div>
    </>
  );
};

export default AddShape;

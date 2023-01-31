import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../modules";

import { setHeight, setSrc, setWidth } from "../../../../modules/addModal";
import styles from "./AddModal.module.scss";

const AddImage = ({
  setImage,
}: {
  setImage: Dispatch<SetStateAction<File | null>>;
}) => {
  const [previewWidth, setPreviewWidth] = useState(150);
  const [previewHeight, setPreviewHeight] = useState(150);
  const [scale, setScale] = useState(1);

  const imageInput = useRef<HTMLInputElement>(null);
  const imagePreviewRef = useRef<HTMLImageElement>(null);

  const { src_url, w } = useSelector((state: RootState) => state.addModal);

  const onLoadImage = () => {
    if (imagePreviewRef.current) {
      setScale(
        imagePreviewRef.current?.height / imagePreviewRef.current?.width,
      );
      setPreviewWidth(imagePreviewRef.current.width);
      setPreviewHeight(150);
      dispatch(setWidth(imagePreviewRef.current.width));
      dispatch(setHeight(150));
    }
  };

  const dispatch = useDispatch();

  const handleImageInput: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    batch(() => {
      if (target.files) {
        setImage(target.files[0]);
        dispatch(setSrc(URL.createObjectURL(target.files[0])));
      }
    });
  };

  const clickImageInput = () => {
    imageInput.current?.click();
  };

  const removeImage = () => {
    batch(() => {
      setImage(null);
      dispatch(setImage(null));
      dispatch(setWidth(150));
      dispatch(setHeight(150));
    });
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
    if (previewWidth !== w) {
      batch(() => {
        dispatch(setWidth(previewWidth));
        dispatch(setHeight(previewWidth * scale));
      });
      setPreviewHeight(previewWidth * scale);
    } else {
      batch(() => {
        dispatch(setHeight(previewHeight));
        dispatch(setWidth(previewHeight / scale));
      });
      setPreviewWidth(previewHeight / scale);
    }
  };

  return (
    <>
      {/* {svgData.svgType === IMAGE ? ( */}
      <div className={styles.addImage}>
        이미지
        <button onClick={clickImageInput}>이미지 추가/변경</button>
        버튼을 클릭하거나 모달창으로 이미지를 드래그앤드롭하세요
        <button onClick={removeImage}>이미지 제거</button>
        <input
          ref={imageInput}
          id="image"
          name="image"
          type="file"
          accept="image/*"
          className={styles.imageInput}
          onChange={handleImageInput}
        />
        <label htmlFor="width">
          너비
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
          길이
          <input
            type="number"
            id="height"
            value={previewHeight}
            min={1}
            onChange={onHeightChange}
            onBlur={onSaveGeometry}
          />
        </label>
        <button onClick={onSaveGeometry}>설정</button>
        <div>
          {src_url ? (
            <img ref={imagePreviewRef} src={src_url} onLoad={onLoadImage} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default AddImage;

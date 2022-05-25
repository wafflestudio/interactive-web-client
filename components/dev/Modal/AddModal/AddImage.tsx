import { Dispatch, SetStateAction, useRef } from "react";
import { useDispatch } from "react-redux";

import { setImage } from "../../../../modules/addModal";
import styles from "./AddModal.module.scss";

interface AddImageProps {
  setImageUrl: Dispatch<SetStateAction<string>>;
}

const AddImage = ({ setImageUrl }: AddImageProps) => {
  const imageInput = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const handleImageInput: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    if (target.files && target.files.length !== 0) {
      dispatch(setImage(target.files[0]));
      setImageUrl(URL.createObjectURL(target.files[0]));
    }
  };

  const clickImageInput = () => {
    imageInput.current?.click();
  };

  return (
    <>
      <div className={styles.addImage}>
        이미지
        <button onClick={clickImageInput}>이미지 추가/변경</button>
        버튼을 클릭하거나 모달창으로 이미지를 드래그앤드롭하세요
        <input
          ref={imageInput}
          id="image"
          name="image"
          type="file"
          accept="image/*"
          className={styles.imageInput}
          onChange={handleImageInput}
        />
      </div>
    </>
  );
};

export default AddImage;

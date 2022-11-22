import axios from "axios";
import {
  ChangeEventHandler,
  Dispatch,
  DragEventHandler,
  SetStateAction,
  useRef,
  useState,
} from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../modules";
import { initialize, setName, setSrc } from "../../../../modules/addModal";
import { usePostObjectMutation } from "../../../../modules/api/objectApi";
import { saveObjects } from "../../../../modules/staticObjects";
import AddImage from "./AddImage";
import AddTag from "./AddTag";
import styles from "./AddModal.module.scss";

interface AddModalProps {
  setAddModal: Dispatch<SetStateAction<boolean>>;
}

const AddModal = ({ setAddModal }: AddModalProps) => {
  const [image, setImage] = useState<File | null>(null);
  const dropbox = useRef<HTMLDivElement>(null);

  const newBead = useSelector((state: RootState) => state.addModal);
  const [postObject] = usePostObjectMutation();

  const dispatch = useDispatch();

  const closeModal = () => setAddModal(false);

  const onNameChange: ChangeEventHandler<HTMLInputElement> = ({ target }) =>
    dispatch(setName(target.value));

  // 드래그 앤 드롭 관련 함수들
  const onDragDefault: DragEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const onDragAndDrop: DragEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const dt = e.dataTransfer;
    const files = dt.files;

    dispatch(setImage(files[0]));
    dispatch(setSrc(URL.createObjectURL(files[0])));
  };

  const initializeInput = () => {
    dispatch(initialize());
  };

  const addBead = async () => {
    // dispatch(saveObjects([newBead]));
    try {
      const bead = {
        ...newBead,
        image,
        src_url: "https://webgam.com/dummy-image-source-url",
        project_name: "project1",
      };
      const formData = new FormData();

      if (!bead.image) return alert("이미지를 넣어주세요");

      for (const key in bead) {
        formData.append(key, bead[key]);
      }
      const result = await postObject(formData);
      if ("data" in result)
        await axios.post(
          "/aws-image/" +
            result.data.image.split(
              "https://webgam-server.s3.amazonaws.com/",
            )[1],
          newBead.image,
        );
    } catch (e) {
      console.log(e);
    }
    closeModal();
  };

  return (
    <div className={`${styles.wrapper}`}>
      <main
        ref={dropbox}
        className={styles.container}
        onClick={(e) => e.stopPropagation()}
        onDragEnter={onDragDefault}
        onDragOver={onDragDefault}
        onDrop={onDragAndDrop}
      >
        <label htmlFor="name">
          이름
          <input
            type="text"
            id="name"
            value={newBead.object_name}
            onChange={onNameChange}
          />
        </label>
        {/* <AddShape /> */}
        <AddImage setImage={setImage} />
        {/* <AddTag /> */}
        <button className={styles.closeModal} onClick={closeModal}>
          &times;
        </button>
        <button className={styles.initialize} onClick={initializeInput}>
          초기화
        </button>
        <button className={styles.add} onClick={addBead}>
          추가
        </button>
      </main>
    </div>
  );
};

export default AddModal;

import React, { useState } from "react";
import ImageCell from "../../../templates/ImageCell/ImageCell";
import styles from "./DetailInfoModal.module.scss";

type ImageType = {
  id: number;
  name: string;
  src: string;
  main?: boolean;
  path: string;
};

const ImageList = () => {
  const [main, setMain] = useState<ImageType>({
    id: 0,
    name: "대표 이미지",
    src: "/images/ex_ghost.png",
    main: true,
    path: "C:UsersWebgamOneDrive문서",
  });
  const [images, setImages] = useState<ImageType[]>([]);

  const onAddImage: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    if (target.files) {
      const binaryData = [];
      binaryData.push(target.files[0]);

      setImages(
        images.concat({
          id: images.length
            ? main.id > Math.max(...images.map((image) => image.id))
              ? main.id + 1
              : Math.max(...images.map((image) => image.id)) + 1
            : 1,
          name: "기타 이미지",
          src: URL.createObjectURL(new Blob(binaryData)),
          path: target.files[0].name,
        }),
      );
    }
  };

  const onChangeMain = (id: number) => {
    const newMain = images.find((image) => image.id === id);
    if (newMain) {
      main.name = "기타 이미지";
      setImages([main, ...images.filter((image) => image.id !== id)]);
      newMain.name = "대표 이미지";
      setMain(newMain);
    }
  };

  return (
    <div className={styles.imageList}>
      <ul>
        <li>
          <ImageCell
            primary={true}
            name={main.name}
            setName={() => {}}
            imageSrc={main.src}
            imagePath={main.path}
            setImage={() => {}}
            moreActions={[
              { text: "도형 만들기", function: () => {} },
              { text: "투명 이미지 만들기", function: () => {} },
            ]}
          />
        </li>
        {images.map((image) => {
          return (
            <li key={image.id} className={styles.images}>
              <ImageCell
                primary={true}
                name={image.name}
                setName={() => {}}
                imageSrc={image.src}
                imagePath={image.path}
                setImage={() => {}}
                moreActions={[
                  { text: "도형 만들기", function: () => {} },
                  { text: "투명 이미지 만들기", function: () => {} },
                  {
                    text: "대표이미지로 설정",
                    function: () => onChangeMain(image.id),
                  },
                ]}
              />
            </li>
          );
        })}
        <li className={styles.plus}>
          <label htmlFor="image">
            <img src="/images/plus.png" alt="plus button" />
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={onAddImage}
          />
        </li>
      </ul>
    </div>
  );
};

export default ImageList;

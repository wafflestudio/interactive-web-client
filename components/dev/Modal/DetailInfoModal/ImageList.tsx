import React, { useState } from "react";
import ImageCell from "../../../templates/ImageCell/ImageCell";
import styles from "./DetailInfoModal.module.scss";

const ImageList = () => {
  const [imageName, setImageName] = useState("추가 이미지");

  return (
    <div className={styles.imageList}>
      <ul>
        <li>
          <ImageCell
            primary={true}
            name={"대표 이미지"}
            setName={() => {}}
            imageSrc={"/public/images/ex_ghost.png"}
            imagePath={"C:UsersWebgamOneDrive문서"}
            setImage={() => {}}
            moreActions={[
              { text: "기능1", function: () => {} },
              { text: "기능2", function: () => {} },
            ]}
          />
        </li>
        <li>
          <ImageCell
            primary={false}
            name={imageName}
            setName={setImageName}
            imageSrc={"/public/images/ex_ghost.png"}
            imagePath={"C:UsersWebgamOneDrive문서"}
            setImage={() => {}}
            moreActions={[
              { text: "기능1", function: () => {} },
              { text: "기능2", function: () => {} },
            ]}
          />
        </li>
      </ul>
    </div>
  );
};

export default ImageList;

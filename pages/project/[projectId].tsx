import type { NextPage } from "next";
import { Sprite, Stage, _ReactPixi } from "@inlet/react-pixi";
import { debounce } from "lodash";
import { useRouter } from "next/router";
import * as PIXI from "pixi.js";

import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddModal from "../../components/dev/Modal/AddModal/AddModal";
import SimpleInfoModal from "../../components/dev/Modal/SimpleInfoModal/SimpleInfoModal";
import { ModalType } from "../../dummies/modalType";
import { RootState } from "../../modules";
import { useGetProjectMessagesQuery } from "../../modules/api/projectWebsocketApi";
import { openSimpleInfoModal } from "../../modules/modal";
import { ObjectDataType } from "../../types/types";
import styles from "./Project.module.scss";

interface Draggable extends PIXI.DisplayObject {
  data: PIXI.InteractionData | null;
  dragging: boolean;
}

const postDummy = JSON.stringify({
  method: "POST",
  endpoint: "/objects/",
  data: {
    project_name: "foo",
    tag: {
      size: "3",
      "0": "string",
      "1": "array",
      "2": "test",
      test: "success",
    },
    visibility: true,
    z_index: 5,
    svg_type: "RE",
    fill: "rgba(255,255,255,0)",
    stroke: "rgba(255,255,255,0)",
    d_string: "M10 10 H 90 V 90 H 10 L 10 10",
    src_url: "https://webgam.com/dummy-image-source-url",
    x: 100,
    y: -100,
    h: 30,
    w: 50,
  },
});

const editDummy = JSON.stringify({
  method: "PATCH",
  endpoint: "/objects/",
  url_params: { id: 1 },
  data: {
    tag: { patch: "test" },
    visibility: false,
    z_index: 10,
  },
});

const deleteDummy = JSON.stringify({
  method: "DELETE",
  endpoint: "/objects/",
  url_params: { id: 23 },
});

const errorDummy = JSON.stringify({
  method: "ERROR",
  endpoint: "/objects/",
  data: {
    project_name: "foo",
    tag: {
      size: "3",
      "0": "string",
      "1": "array",
      "2": "test",
      test: "success",
    },
    visibility: true,
    z_index: 5,
    svg_type: "RE",
    fill: "rgba(255,255,255,0)",
    stroke: "rgba(255,255,255,0)",
    d_string: "M10 10 H 90 V 90 H 10 L 10 10",
    src_url: "https://webgam.com/dummy-image-source-url",
    x: 100,
    y: -100,
    h: 30,
    w: 50,
  },
});

const CustomSprite = () => {
  const [spriteInfo, setSpriteInfo] = useState<ObjectDataType>({
    id: 0,
    name: "ghost",
    src: "/images/ex_ghost.png",
    geometry: {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    },
    opacity: 1,
    tag: ["ghost"],
    visibility: true,
    zIndex: 0,
  });
  const onDragStart = (event: PIXI.InteractionEvent) => {
    const sprite = event.currentTarget as Draggable;
    console.log("drag start");

    sprite.anchor.set(
      (event.data.global.x - sprite.x) / sprite.width,
      (event.data.global.y - sprite.y) / sprite.height,
    );

    sprite.position.set(
      sprite.position.x + sprite.anchor.x * sprite.width,
      sprite.position.y + sprite.anchor.y * sprite.height,
    );

    sprite.alpha = 0.5;
    sprite.data = event.data;
    sprite.dragging = true;
  };

  const onDragEnd = (event: PIXI.InteractionEvent) => {
    const sprite = event.currentTarget as Draggable;
    sprite.alpha = 1;
    sprite.dragging = false;
    sprite.data = null;

    sprite.position.set(
      sprite.position.x - sprite.anchor.x * sprite.width,
      sprite.position.y - sprite.anchor.y * sprite.height,
    );

    sprite.anchor.set(0, 0);
  };

  const onDragMove = (event: PIXI.InteractionEvent) => {
    const sprite = event.currentTarget as Draggable;
    if (sprite.dragging) {
      const newPosition = sprite.data!.getLocalPosition(sprite.parent);
      sprite.x = newPosition.x;
      sprite.y = newPosition.y;
    }
  };

  //   const dispatch = useDispatch();

  const onRightClick = (event: PIXI.InteractionEvent) => {
    const sprite = event.currentTarget as PIXI.Sprite;
    console.log("right click");
    const spriteObject = {
      id: 0,
      name: "ghost",
      src: "/images/ex_ghost.png",
      geometry: {
        x: sprite.x,
        y: sprite.y,
        w: sprite.texture.width,
        h: sprite.texture.height,
      },
      opacity: sprite.alpha,
      tag: ["ghost"],
      visibility: true,
      zIndex: sprite.zIndex,
    };
    setSpriteInfo(spriteObject);
    // dispatch(openSimpleInfoModal(spriteObject));
  };

  return (
    <>
      <Sprite
        image={"/images/ex_ghost.png"}
        x={200}
        y={200}
        interactive={true}
        buttonMode={true}
        pointerdown={onDragStart}
        pointerup={onDragEnd}
        pointerupoutside={onDragEnd}
        pointermove={onDragMove}
        rightclick={onRightClick}
      />
      {/* <SimpleInfoModal
        targetModal={{
          type: ModalType.OBJECT_SIMPLE_INFO,
          target: spriteInfo,
        }}
      /> */}
    </>
  );
};

interface Draggable extends PIXI.DisplayObject {
  data: PIXI.InteractionData | null;
  dragging: boolean;
}

const Project: NextPage = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  const [openAddModal, setOpenAddModal] = useState(false);
  const router = useRouter();
  const { projectId: id } = router.query;
  // const { data, isFetching } = useGetProjectQuery(Number(id));
  const { data } = useGetProjectMessagesQuery(id, {
    skip: typeof id !== "string",
  });
  console.log(data);
  const wrapperRef = useRef<HTMLElement>(null);
  const [app, setApp] = useState<PIXI.Application>();

  const openNewBeadsModal: MouseEventHandler<HTMLCanvasElement> = (e) => {
    e.preventDefault();
    setOpenAddModal(true);
  };

  const beads = useSelector((state: RootState) => state.staticObjects);
  console.log(beads);

  useEffect(() => {
    if (app) {
      const setStageSize = () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
      };
      const onResize = debounce(setStageSize, 200);
      setStageSize();
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }
  }, [app]);

  return (
    <>
      <article className={styles.wrapper} ref={wrapperRef}>
        <div className={styles.buttonWrapper}>
          <button
            className={styles.wsButton}
            onClick={(e) => {
              ws.send(postDummy);
            }}
          >
            생성
          </button>
          <button
            className={styles.wsButton}
            onClick={(e) => {
              ws.send(editDummy);
            }}
          >
            수정
          </button>
          <button
            className={styles.wsButton}
            onClick={(e) => {
              ws.send(deleteDummy);
            }}
          >
            삭제
          </button>
          <button
            className={styles.wsButton}
            onClick={(e) => {
              ws.send(errorDummy);
            }}
          >
            에러
          </button>
        </div>
        <Stage
          onContextMenu={openNewBeadsModal}
          onMount={setApp}
          width={500}
          height={500}
        >
          <CustomSprite />
          {beads.map((bead) => (
            <DisplayObjectFromStaticObjects key={bead.id} bead={bead} />
          ))}
        </Stage>
      </article>
      {openAddModal ? <AddModal setAddModal={setOpenAddModal} /> : null}
    </>
  );
};

const DisplayObjectFromStaticObjects = ({ bead }: { bead: ObjectDataType }) => {
  if (bead.src) {
    return <Sprite image={bead.src} x={bead.geometry.x} y={bead.geometry.y} />;
  }
  return null;
};

export default Project;

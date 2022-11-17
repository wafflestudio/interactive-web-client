import type { NextPage } from "next";
import { Sprite, Stage } from "@inlet/react-pixi";
import { debounce } from "lodash";
import { useRouter } from "next/router";
import * as PIXI from "pixi.js";

import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import AddModal from "../../components/dev/Modal/AddModal/AddModal";
import { RootState } from "../../modules";
import { useGetProjectMessagesQuery } from "../../modules/api/projectWebsocketApi";
import { ObjectDataType } from "../../types/types";
import styles from "./Project.module.scss";

interface Draggable extends PIXI.Sprite {
  data: PIXI.InteractionData | null;
  dragging: boolean;
}

const CustomSprite = ({ bead }: { bead: ObjectDataType | undefined }) => {
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
  if (!bead)
    return (
      <>
        <Sprite
          image={"/images/ex_ghost.png"}
          x={200}
          y={200}
          interactive={true}
          buttonMode={true}
          mousedown={onDragStart}
          mouseup={onDragEnd}
          mouseupoutside={onDragEnd}
          mousemove={onDragMove}
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
  else if (bead.src) {
    console.log(bead.src);
    return (
      <Sprite
        image={bead.src}
        x={bead.geometry.x}
        y={bead.geometry.y}
        width={bead.geometry.w}
        height={bead.geometry.h}
        interactive={true}
        buttonMode={true}
        mousedown={onDragStart}
        mouseup={onDragEnd}
        mouseupoutside={onDragEnd}
        mousemove={onDragMove}
        rightclick={onRightClick}
      />
    );
  }
  return null;
};

interface Draggable extends PIXI.Sprite {
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
        <Stage
          onContextMenu={openNewBeadsModal}
          onMount={setApp}
          width={500}
          height={500}
        >
          <CustomSprite bead={undefined} />
          {beads.map((bead) => (
            <CustomSprite key={bead.id} bead={bead} />
          ))}
        </Stage>
      </article>
      {openAddModal ? <AddModal setAddModal={setOpenAddModal} /> : null}
    </>
  );
};

export default Project;

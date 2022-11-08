import type { NextPage } from "next";
import { Sprite, Stage, useTick } from "@inlet/react-pixi";
import { useRouter } from "next/router";
import * as PIXI from "pixi.js";

import { useEffect, useRef, useState } from "react";
import { useGetProjectQuery } from "../../modules/api/projectApi";
import styles from "./Project.module.scss";

interface Draggable extends PIXI.DisplayObject {
  data: PIXI.InteractionData | null;
  dragging: boolean;
}

const CustomSprite = () => {
  const onDragStart = (event: PIXI.InteractionEvent) => {
    console.count("start");
    const sprite = event.currentTarget as Draggable;
    console.log(sprite.x);
    console.dir(event.data.global.x);
    sprite.alpha = 0.5;
    sprite.data = event.data;
    sprite.dragging = true;
  };

  const onDragEnd = (event: PIXI.InteractionEvent) => {
    const sprite = event.currentTarget as Draggable;
    sprite.alpha = 1;
    sprite.dragging = false;
    sprite.data = null;
  };

  const onDragMove = (event: PIXI.InteractionEvent) => {
    const sprite = event.currentTarget as Draggable;
    if (sprite.dragging) {
      const newPosition = sprite.data!.getLocalPosition(sprite.parent);
      sprite.x = newPosition.x;
      sprite.y = newPosition.y;
    }
  };
  return (
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
    />
  );
};

const Project: NextPage = () => {
  const router = useRouter();
  const { projectId: id } = router.query;
  // const { data, isFetching } = useGetProjectQuery(Number(id));
  const wrapperRef = useRef<HTMLElement>(null);
  const [ws, setWs] = useState<WebSocket>();
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const setStageSize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const onResize = debounce(setStageSize, 200);
    setStageSize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    try {
      const webSocket = new WebSocket(
        `wss://webgam-server.shop/ws/project/2/?access_token=${String(
          localStorage.getItem("accessToken"),
        )}`,
      );
      webSocket.onopen = () => {
        console.log("오픈!");
        setWs(webSocket);
      };
      webSocket.onmessage = (event) => {
        console.log(event.data);
      };
    } catch (e) {}
  }, []);

  if (!ws) {
    return <div>Loading...</div>;
  }

  return (
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
      <Stage width={windowSize.width} height={windowSize.height}>
        <CustomSprite />
      </Stage>
    </article>
  );
};

export default Project;

import type { NextPage } from "next";
import { Sprite, Stage } from "@inlet/react-pixi";
import { useRouter } from "next/router";
import * as PIXI from "pixi.js";

import { useEffect, useRef, useState } from "react";
import styles from "./Project.module.scss";
import { debounce } from "lodash";

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
  const onDragStart = (event: PIXI.InteractionEvent) => {
    const sprite = event.currentTarget as Draggable;

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
  const [app, setApp] = useState<PIXI.Application>();
  const [ws, setWs] = useState<WebSocket>();

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
      <Stage onMount={setApp} width={500} height={500}>
        <CustomSprite />
      </Stage>
    </article>
  );
};

export default Project;

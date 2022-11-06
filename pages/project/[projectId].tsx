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
      image={"/images/logo/logo.png"}
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
  const [ws, setWs] = useState<any>(null);

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
    } catch (e) {}
  }, []);

  return (
    <article className={styles.wrapper} ref={wrapperRef}>
      <Stage
        width={wrapperRef.current ? wrapperRef.current.offsetWidth : 100}
        height={wrapperRef.current ? wrapperRef.current.offsetHeight : 100}
      >
        <CustomSprite />
      </Stage>
      <button
        onClick={(e) => {
          ws.send(
            JSON.stringify({
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
            }),
          );
        }}
      >
        {" "}
        생성
      </button>
      <button
        onClick={(e) => {
          ws.send(
            JSON.stringify({
              method: "PATCH",
              endpoint: "/objects/",
              url_params: { id: 1 },
              data: {
                tag: { patch: "test" },
                visibility: false,
                z_index: 10,
              },
            }),
          );
        }}
      >
        수정
      </button>
      <button
        onClick={(e) => {
          ws.send(
            JSON.stringify({
              method: "DELETE",
              endpoint: "/objects/",
              url_params: { id: 1 },
            }),
          );
        }}
      >
        {" "}
        삭제
      </button>
      <button
        onClick={(e) => {
          ws.send(
            JSON.stringify({
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
            }),
          );
        }}
      >
        {" "}
        에러
      </button>
    </article>
  );
};

export default Project;

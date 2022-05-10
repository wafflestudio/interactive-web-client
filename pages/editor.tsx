import type { NextPage } from "next";

import Image from "next/image";

import styles from "../styles/Home.module.css";
import Indicator from "../components/dev/Indicator/Indicator";
import SampleSvg from "../components/dev/SampleSvg/SampleSvg";
import DynamicCanvas from "../components/dev/DynamicCanvas/DynamicCanvas";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules";
import { useEffect, useState } from "react";
import { sampleObjectDummy } from "../dummies/sampleObjectDummy";
import Modal from "../components/dev/Modal/Modal";
import { saveObjects } from "../modules/staticObjects";

const Editor: NextPage = () => {
  const dispatch = useDispatch();
  //redux 에서 모든 objects 의 배열 가져옴
  const staticObjects = useSelector((state: RootState) => {
    return state.staticObjects;
  });

  //API 호출을 통한 데이터 로드를 대신하는 부분
  useEffect(() => {
    dispatch(saveObjects(sampleObjectDummy));
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Editor page!</h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/editor.tsx</code>
        </p>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
      <Indicator />
      <div className={styles.container}>
        {staticObjects.map((item, index) => {
          return <SampleSvg key={index} item={item} />;
        })}
      </div>
      <DynamicCanvas />
      <Modal />
    </div>
  );
};

export default Editor;

import axios from "axios";
import { useEffect, useRef, useState } from "react";

import { Simulate } from "react-dom/test-utils";
import submit = Simulate.submit;
import HomeBanner from "../components/Home/Banner/HomeBanner";
import CardList from "../components/Home/Card/CardList";
import Header from "../components/Home/Header/Header";
import HomeHead from "../components/Home/HomeHead";
import Logo from "../components/Home/Logo/Logo";
import Sidebar from "../components/Home/Sidebar/Sidebar";

import { usePostMyProjectMutation } from "../modules/api/projectApi";
import styles from "./Home.module.scss";

// 홈 화면 전체
const Home = () => {
  const [isSideBar, setIsSideBar] = useState<boolean>(false);
  const htmlRef = useRef<HTMLInputElement>(null);
  const [html, setHtml] = useState<File | null>(null);
  const [js, setJs] = useState<File | null>(null);
  const [css, setCss] = useState<File | null>(null);

  const [postProject] = usePostMyProjectMutation();
  const handleInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      setHtml(e.target.files[0]);
    }
  };

  return (
    <>
      <HomeHead />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              try {
                if (html && js && css) {
                  const formData = new FormData();
                  formData.append("title", "htmlCssJsTest1");
                  formData.append("html", html);
                  formData.append("css", css);
                  formData.append("js", js);
                  postProject(formData);
                } else {
                  console.log("empty html");
                }
              } catch (e) {
                console.log(e);
              }
            }}
          >
            <input
              //ref={htmlInput}
              id="htmlInput"
              name="htmlInput"
              type="file"
              accept=".html"
              onChange={handleInput}
            />
            <input
              //ref={htmlInput}
              id="htmlInput"
              name="htmlInput"
              type="file"
              accept=".js"
              onChange={(e) => {
                if (e.target.files) {
                  setJs(e.target.files[0]);
                }
              }}
            />
            <input
              //ref={htmlInput}
              id="htmlInput"
              name="htmlInput"
              type="file"
              accept=".css"
              onChange={(e) => {
                if (e.target.files) {
                  setCss(e.target.files[0]);
                }
              }}
            />
            <input type="submit" />
          </form>
          <Header setIsSidebar={setIsSideBar} />
          {isSideBar && <Sidebar setIsSidebar={setIsSideBar} />}
          <Logo />
          <HomeBanner />
          <CardList />
        </div>
      </div>
    </>
  );
};

export default Home;

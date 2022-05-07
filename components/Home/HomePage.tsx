import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { api } from "../../api/api";
import { setUser } from "../../modules/user";
import HomeMain from "./Main/HomeMain";
import PageHead from "./PageHead";
import SideBar from "./Sidebar/SideBar";
import styles from "./HomePage.module.scss";

export default function HomePage() {
  const dispatch = useDispatch();

  const checkLogin = async () => {
    try {
      const { data } = await api._getme();
      dispatch(setUser({ ...data, isLoggedIn: true }));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <>
      <PageHead />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <SideBar />
          <HomeMain />
        </div>
      </div>
    </>
  );
}

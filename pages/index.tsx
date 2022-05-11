import type { NextPage } from "next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { api } from "../api/api";
import HomePage from "../components/Home/HomePage";
import { setUser } from "../modules/user";

const Home: NextPage = () => {
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
      <HomePage />
    </>
  );
};

export default Home;

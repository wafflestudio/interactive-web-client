import type { NextPage } from "next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { api } from "../api/api";
import HomePage from "../components/Home/HomePage";
import { setUser } from "../modules/user";

const Home: NextPage = () => {
  return (
    <>
      <HomePage />
    </>
  );
};

export default Home;

import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { api, authInstance } from "../api/api";
import { ACCESS_TOKEN_KEY } from "../functions/auth";
import { wrapper } from "../modules";
import "../styles/globals.scss";
import { signIn, signOut } from "../modules/auth";
import { setUser } from "../modules/user";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const dispatch = useDispatch();

  const checkAuth = async () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (accessToken) {
      authInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
      try {
        const { data } = await api._getme();
        dispatch(setUser(data));
        dispatch(signIn());
      } catch (e) {
        console.log(e);
        dispatch(signOut());
      }
    }
    dispatch(signOut());
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return <Component {...pageProps} />;
};

export default wrapper.withRedux(MyApp);

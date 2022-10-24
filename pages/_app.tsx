import type { AppProps } from "next/app";
import { useDispatch } from "react-redux";
import { api, authInstance } from "../api/api";
import { wrapper } from "../modules";
import "../styles/globals.scss";
import { signIn, signOut } from "../modules/auth";
import { useEffect } from "react";
import { ACCESS_TOKEN_KEY } from "../functions/auth";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const dispatch = useDispatch();

  const checkAuth = async () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (accessToken) {
      authInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
      try {
        await api._getme();
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

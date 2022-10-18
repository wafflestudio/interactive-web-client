import type { AppProps } from "next/app";
import { useDispatch } from "react-redux";
import { api } from "../api/api";
import { wrapper } from "../modules";
import "../styles/globals.scss";
import { signIn, signOut } from "../modules/auth";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const dispatch = useDispatch();

  const checkAuth = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
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
  checkAuth();

  return <Component {...pageProps} />;
};

export default wrapper.withRedux(MyApp);

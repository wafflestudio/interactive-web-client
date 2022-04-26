import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "../modules";
import "../styles/globals.css";
import graphicsMiddleware from "../modules/middlewares/graphicsMiddleware";

const store = createStore(rootReducer, applyMiddleware(graphicsMiddleware));

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;

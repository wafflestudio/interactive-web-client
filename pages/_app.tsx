import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "../modules";
import "../styles/globals.css";
import logMiddleware from "../modules/middlewares/logMiddleware";
import staticsMiddleware from "../modules/middlewares/staticsMiddleware";

export const store = createStore(
  rootReducer,
  applyMiddleware(logMiddleware, staticsMiddleware),
);

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;

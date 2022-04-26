import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "../modules";
import "../styles/globals.css";
import myMiddleware from "../modules/myMiddleware";

const store = createStore(rootReducer, applyMiddleware(myMiddleware));

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;

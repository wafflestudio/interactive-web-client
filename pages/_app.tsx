import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../modules";
import "../styles/globals.css";

const store = createStore(rootReducer);

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;

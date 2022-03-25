import '../styles/globals.css'
import {Provider} from 'react-redux'
import {createStore} from 'redux'

import rootReducer from '../modules'

import type {AppProps} from 'next/app'

const store = createStore(rootReducer)

function MyApp({Component, pageProps}: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp

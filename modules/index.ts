import {combineReducers} from 'redux'

import drag from './drag'
import objects from './objects'

const rootReducer = combineReducers({
  drag,
  objects
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>

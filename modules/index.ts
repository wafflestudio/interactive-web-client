import {combineReducers} from 'redux'

import objects from './objects'
import position from './position'

const rootReducer = combineReducers({
  position,
  objects
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>

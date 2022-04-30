import {combineReducers} from 'redux'

import drag from './drag'
import objects from './objects'
import testType from './testType'
import user from './user'

const rootReducer = combineReducers({
  drag,
  objects,
  testType,
  user
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>

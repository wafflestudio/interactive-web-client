import {combineReducers} from 'redux'

import drag from './drag'
import objects from './objects'
import testType from './testType'

const rootReducer = combineReducers({
  drag,
  objects,
  testType
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>

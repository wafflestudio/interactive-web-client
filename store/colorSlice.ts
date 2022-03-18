import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type IColorState = {
  fill: string
  stroke: string
}

type IColorReducer = {
  setFillColor: (
    state: IColorState,
    action: PayloadAction<string>
  ) => IColorState
  setStrokeColor: (
    state: IColorState,
    action: PayloadAction<string>
  ) => IColorState
}

const initialState = {
  fill: '#ffc966',
  stroke: '#4287f5'
}

const colorSlice = createSlice<IColorState, IColorReducer>({
  name: 'color',
  initialState,
  reducers: {
    setFillColor: (state, action) => {
      return {
        fill: action.payload,
        stroke: state.stroke
      }
    },
    setStrokeColor: (state, action) => {
      return {
        fill: state.fill,
        stroke: action.payload
      }
    }
  }
})

export const {setFillColor, setStrokeColor} = colorSlice.actions

export default colorSlice.reducer

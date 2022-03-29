const SET_TESTTYPE = 'testType/SET_TESTTYPE' as const

export const setTestType = (input: number) => ({
  type: SET_TESTTYPE,
  payload: input
})

type TestTypeAction = ReturnType<typeof setTestType>

const initialState = 0

function testType(state = initialState, action: TestTypeAction) {
  switch (action.type) {
    case SET_TESTTYPE:
      return action.payload
    default:
      return state
  }
}

export default testType

import {ObjectDataType} from '../dummies/dummyInterface'
import {ModalDataType, ModalType} from '../dummies/modalType'

const OPEN_INFO_MODAL = 'modal/OPEN_MODAL' as const
const CLOSE_ALL_MODAL = 'modal/CLOSE_MODAL' as const

type ModalState = {
  isOn: boolean
  modals: ModalDataType[]
}

//start, move end는 각각 mousedown, mousemove, mouseup 시에 호출됩니다
export const openInfoModal = (target: ObjectDataType) => ({
  type: OPEN_INFO_MODAL,
  payload: {target}
})

export const closeAllModal = () => ({
  type: CLOSE_ALL_MODAL
})

type ModalAction =
  | ReturnType<typeof openInfoModal>
  | ReturnType<typeof closeAllModal>

const initialState: ModalState = {
  isOn: false,
  modals: []
}

function modal(
  state: ModalState = initialState,
  action: ModalAction
): ModalState {
  switch (action.type) {
    case OPEN_INFO_MODAL:
      return {
        isOn: true,
        modals: [
          ...state.modals,
          {type: ModalType.OBJECT_INFO, target: action.payload.target}
        ]
      }
    case CLOSE_ALL_MODAL:
      return {
        isOn: false,
        modals: []
      }
    default:
      return state
  }
}

export default modal

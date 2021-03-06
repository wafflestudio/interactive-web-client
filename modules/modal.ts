import { ObjectDataType } from "../dummies/dummyInterface";
import { ModalDataType, ModalType } from "../dummies/modalType";

export const OPEN_SIMPLE_INFO_MODAL = "modal/OPEN_SIMPLE_MODAL" as const;
export const OPEN_DETAIL_INFO_MODAL = "modal/OPEN_DETAIL_MODAL" as const;
export const CLOSE_SIMPLE_INFO_MODAL = "modal/CLOSE_SIMPLE_INFO_MODAL" as const;
export const CLOSE_DETAIL_INFO_MODAL = "modal/CLOSE_DETAIL_INFO_MODAL" as const;
export const CLOSE_ALL_MODALS = "modal/CLOSE_ALL_MODALS" as const;

type ModalState = {
  modals: ModalDataType[];
};

//start, move end는 각각 mousedown, mousemove, mouseup 시에 호출됩니다
export const openSimpleInfoModal = (target: ObjectDataType) => ({
  type: OPEN_SIMPLE_INFO_MODAL,
  payload: { target },
});

export const closeSimpleInfoModal = () => ({
  type: CLOSE_SIMPLE_INFO_MODAL,
});

export const openDetailInfoModal = (target: ObjectDataType) => ({
  type: OPEN_DETAIL_INFO_MODAL,
  payload: { target },
});

export const closeDetailInfoModal = () => ({
  type: CLOSE_DETAIL_INFO_MODAL,
});

export const closeAllModals = () => ({
  type: CLOSE_ALL_MODALS,
});

type ModalAction =
  | ReturnType<typeof closeAllModals>
  | ReturnType<typeof openSimpleInfoModal>
  | ReturnType<typeof closeDetailInfoModal>
  | ReturnType<typeof openDetailInfoModal>
  | ReturnType<typeof closeSimpleInfoModal>;

const initialState: ModalState = {
  modals: [],
};

function modal(
  state: ModalState = initialState,
  action: ModalAction,
): ModalState {
  switch (action.type) {
    case OPEN_SIMPLE_INFO_MODAL:
      return {
        modals: [
          ...state.modals,
          { type: ModalType.OBJECT_SIMPLE_INFO, target: action.payload.target },
        ],
      };
    case CLOSE_SIMPLE_INFO_MODAL:
      return {
        modals: state.modals.filter(
          (modal) => modal.type !== ModalType.OBJECT_SIMPLE_INFO,
        ),
      };
    case OPEN_DETAIL_INFO_MODAL:
      return {
        modals: [
          ...state.modals,
          { type: ModalType.OBJECT_DETAIL_INFO, target: action.payload.target },
        ],
      };
    case CLOSE_DETAIL_INFO_MODAL:
      return {
        modals: state.modals.filter(
          (modal) => modal.type !== ModalType.OBJECT_DETAIL_INFO,
        ),
      };
    case CLOSE_ALL_MODALS:
      return {
        modals: [],
      };
    default:
      return state;
  }
}

export default modal;

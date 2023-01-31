import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalDataType, ModalType } from "../dummies/modalType";
import { ObjectDataType } from "../types/types";

type ModalState = {
  modals: ModalDataType[];
};

//start, move end는 각각 mousedown, mousemove, mouseup 시에 호출됩니다

const initialState: ModalState = {
  modals: [],
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openSimpleInfoModal: (state, action: PayloadAction<ObjectDataType>) => {
      state.modals = [
        ...state.modals,
        { type: ModalType.OBJECT_SIMPLE_INFO, target: action.payload },
      ];
    },
    closeSimpleInfoModal: (state) => {
      state.modals = state.modals.filter(
        (modal) => modal.type !== ModalType.OBJECT_SIMPLE_INFO,
      );
    },
    openDetailInfoModal: (state, action: PayloadAction<ObjectDataType>) => {
      state.modals = [
        ...state.modals,
        { type: ModalType.OBJECT_DETAIL_INFO, target: action.payload },
      ];
    },
    closeDetailInfoModal: (state) => {
      state.modals = state.modals.filter(
        (modal) => modal.type !== ModalType.OBJECT_DETAIL_INFO,
      );
    },
    closeAllModals: () => initialState,
  },
});

export const {
  openSimpleInfoModal,
  closeSimpleInfoModal,
  openDetailInfoModal,
  closeDetailInfoModal,
  closeAllModals,
} = modalSlice.actions;
export default modalSlice.reducer;

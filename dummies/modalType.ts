import { ObjectDataType } from "../types/types";

export interface ModalDataType {
  type: ModalType;
  target?: ObjectDataType;
}

export enum ModalType {
  OBJECT_SIMPLE_INFO = "object_simple_info",
  OBJECT_DETAIL_INFO = "object_detail_info",
}

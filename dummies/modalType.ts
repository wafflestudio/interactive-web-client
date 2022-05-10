import {ObjectDataType} from './dummyInterface'

export interface ModalDataType {
  type: ModalType
  target?: ObjectDataType
}

export enum ModalType {
  OBJECT_INFO = 'object_info'
}

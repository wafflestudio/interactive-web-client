import { IObject, IPage } from "../../types/base";

/**
 * Listener 관련 타입
 */
type DataIdType = number;
type SliceType<T> = (value: T) => Partial<T>;

interface ListenerType {
  listenerId: number;
  forceUpdate: () => void;
}

export interface SinglePageListenerType extends ListenerType {
  dependentId: DataIdType;
}
export interface SingleObjectListenerType extends ListenerType {
  dependentId: DataIdType;
  parentId: DataIdType;
}
export interface AllPageListenerType extends ListenerType {
  dependentSlice: SliceType<IPage> | null;
}
export interface AllObjectListenerType extends ListenerType {
  dependentSlice: SliceType<IObject> | null;
  parentId: DataIdType;
}

export type IListeners = {
  allPage: AllPageListenerType[];
  singlePage: SinglePageListenerType[];
  allObject: AllObjectListenerType[];
  singleObject: SingleObjectListenerType[];
};

/**
 * Hook 관련 타입
 */
export type SingleSetterType<T> = (value: Partial<T>) => void;
export type AllSetterType<T> = (value: Partial<T>[]) => void;

type AllDataHookReturnType<T> = [Partial<T>[], AllSetterType<T>];
type SingleDataHookReturnType<T> = [T | null, SingleSetterType<T>, () => void];

export type IAllPageHook = (
  slice?: SliceType<IPage>,
) => AllDataHookReturnType<IPage>;
export type IAllObjectHook = (
  pageId: DataIdType,
  slice?: SliceType<IObject>,
) => AllDataHookReturnType<IObject>;

export type ISinglePageHook = (
  pageId: DataIdType,
) => SingleDataHookReturnType<IPage>;
export type ISingleObjectHook = (
  objectId: DataIdType,
  pageId: DataIdType,
) => SingleDataHookReturnType<IObject>;

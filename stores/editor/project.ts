import { useEffect, useReducer, useRef } from "react";
import { IPage, IProject } from "../../types/base";

const dummy: IProject = {
  id: 0,
  owner_id: 100,
  title: "test project",
  variables: {},
  pages: [
    {
      id: 1,
      name: "test page",
      projectId: 0,
      objects: [
        {
          id: 2,
          type: "image",
          name: "test object",
          isInteractive: false,
          positionX: 100,
          positionY: 200,
          width: 10,
          height: 20,
          zIndex: 5,
          opacity: 0.5,
          page_id: 1,
          imageSource: "source",
          isReversed: false,
          rotateDegree: 0,
        },
      ],
    },
  ],
  events: [],
};

/*** Type ***/
type PageListenerType = {
  listenerId: number;
  dependentId: number;
  forceUpdate: () => void;
};
type IListeners = {
  page: PageListenerType[];
};

type SetterType<T> = (value: Partial<T>) => void;
type SliceType<T> = (value: T) => Partial<T>;

type SingleDataHookReturnType<T> = [T | null, SetterType<T>];

type IPageSingleDataHook = (id: number) => SingleDataHookReturnType<IPage>;

/*** Data ***/
const isInitiated = false;
let listenerId = 0;
const listeners: IListeners = {
  page: [],
};

/*** Hooks ***/
export const useSinglePage: IPageSingleDataHook = (id: number) => {
  const [, forceUpdate] = useReducer((c: number): number => c + 1, 0);
  const pageId = useRef<number>(id);
  const pageValue = useRef<IPage>(null);

  const getter = pageValue.current;
  const setter: SetterType<IPage> = (value) => {};

  useEffect(() => {
    if (isInitiated) {
      listeners.page.push({
        listenerId: listenerId,
        dependentId: pageId.current,
        forceUpdate,
      });
      listenerId++;
    }
  }, [isInitiated]);

  return [getter, setter];
};

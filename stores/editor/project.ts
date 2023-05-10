import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { IObject, IPage, IProject } from "../../types/base";
import { isPartialDifferent, safeApply } from "./calculate";

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
  dependentId: number | null | undefined;
  forceUpdate: () => void;
};
type IListeners = {
  page: PageListenerType[];
};
type SetterType<T> = (value: Partial<T>) => void;
type SliceType<T> = (value: T) => Partial<T>;

type SingleDataHookReturnType<T> = [T | null, SetterType<T>, () => void]; //useState랑 동일 + destroy 추가

type IPageSingleDataHook = (id: number) => SingleDataHookReturnType<IPage>;
type IObjectSingleDataHook = (
  parentId: number,
  myId: number,
) => SingleDataHookReturnType<IObject>;

/*** Data ***/
let projectData: IProject = dummy;
const isInitiated = false;
let listenerId = 0;

const listeners: IListeners = {
  page: [],
};

/*** Hooks ***/
export const useSinglePage: IPageSingleDataHook = (id: number) => {
  const [, forceUpdate] = useReducer((c: number): number => c + 1, 0);
  const pageId = useRef<number>(id);

  const getter =
    projectData.pages.find((page) => page.id === pageId.current) ?? null;
  const setter: SetterType<IPage> = (value) => {
    //1. 전역 project 객체의 값을 찾아서 바꾼다
    projectData = {
      ...projectData,
      pages: projectData.pages.map((page) =>
        page.id === pageId.current ? { ...page, ...value } : page,
      ),
    };
    //2. listeners 배열에서 같은 페이지 아이디를 구독하고 있는 모든 리스너들을 업데이트 시킨다(forceUpdate 이용)
    listeners.page.forEach((listener) => {
      if (listener.dependentId === pageId.current) listener.forceUpdate();
    });
  };
  //삭제에 관한 기능은 따로 제공한다.
  const destroy = () => {
    //1. 전역 project 객체의 값을 찾아서 바꾼다
    projectData = {
      ...projectData,
      pages: projectData.pages.filter((page) => page.id !== pageId.current),
    };
    //2. 모든 listener를 리렌더한다
    listeners.page.forEach((listener) => {
      listener.forceUpdate();
    });
  };

  //훅이 최초로 콜 되었을 때
  useEffect(() => {
    if (!isInitiated) {
      listeners.page.push({
        listenerId: listenerId,
        dependentId: pageId.current,
        forceUpdate,
      });
      listenerId++;
    }
  }, [isInitiated]);

  return [getter, setter, destroy];
};

//useSingleObject
export const useSingleObject: IObjectSingleDataHook = (parentId, myId) => {
  const [, forceUpdate] = useReducer((c: number): number => c + 1, 0);
  const pageId = useRef<number>(parentId);
  const objectId = useRef<number>(myId);

  const getParentPage = () =>
    projectData.pages.find((page) => page.id === pageId.current) ?? null;

  const getter = () => {
    const parent = getParentPage();
    if (!parent) {
      return null;
    }
    return (
      parent.objects.find((object) => object.id === objectId.current) ?? null
    );
  };

  const setter: SetterType<IObject> = (value) => {
    const parent = getParentPage();
    if (!parent) {
      return null;
    }
    const newPage: IPage = {
      ...parent,
      objects: parent.objects.map((object) =>
        object.id === objectId.current ? safeApply(object, value) : object,
      ),
    };
    projectData = {
      ...projectData,
      pages: projectData.pages.map((page) =>
        page.id === pageId.current ? newPage : page,
      ),
    };
  };

  const destroy = () => {
    const parent = getParentPage();
    if (!parent) {
      return null;
    }
    const newPage: IPage = {
      ...parent,
      objects: parent.objects.filter(
        (object) => object.id !== objectId.current,
      ),
    };
    projectData = {
      ...projectData,
      pages: projectData.pages.map((page) =>
        page.id === pageId.current ? newPage : page,
      ),
    };
  };

  return [getter(), setter, destroy];
};

//useAllPages, useAllObjects: 구현이 위에 꺼랑은 다를 듯

/***
 * 고민 거리
 * 1. useSingleObject와 Page 사이의 분리
 * 2. 값의 깊은 비교를 할까? (동일한 객체를 setter에 넣으면 아무 변화도 일어나지 않게)
 * 3. 전역 project 값으
 * 3a. 자바스크립트 내장 객체 Map 공부해보기
 */

type PageSliceType = (page: IPage) => Partial<IPage>;

type AllSetterType<T> = (value: T) => void;

type IAllPagesHook = (
  slice?: PageSliceType,
) => [Partial<IPage>[], AllSetterType<Partial<IPage>[]>];

type AllListenerType = {
  listenerId: number;
  dependentSlice: undefined | PageSliceType;
  forceUpdate: () => void;
};
type IAllListeners = {
  page: AllListenerType[];
};

const allPageListeners: IAllListeners = {
  page: [{ listenerId: 0, dependentSlice: undefined, forceUpdate: () => {} }],
};

export const useAllPages: IAllPagesHook = (slice) => {
  const [, forceUpdate] = useReducer((c: number): number => c + 1, 0);

  // useMemo로 렌더링 최적화
  const getter = useMemo(() => {
    if (slice) {
      return () => projectData.pages.map((page) => slice(page));
    }
    return () => projectData.pages;
  }, [slice]);

  const setter: AllSetterType<Partial<IPage>[]> = (value) => {
    if (slice) {
      projectData = {
        ...projectData,
        pages: projectData.pages.map((page) =>
          !value.some((v) => v.id === page.id)
            ? page
            : JSON.stringify(
                slice(value.find((v) => v.id === page.id) as IPage),
              ) === JSON.stringify(slice(page))
            ? page
            : (value.find((v) => v.id === page.id) as IPage),
        ),
      };
    } else {
      projectData = {
        ...projectData,
        pages: projectData.pages.map((page) =>
          !value.some((v) => v.id === page.id)
            ? page
            : JSON.stringify(value.find((v) => v.id === page.id)) ===
              JSON.stringify(page)
            ? // 깊은 비교를 위해서
              page
            : (value.find((v) => v.id === page.id) as IPage),
        ),
      };
    }

    allPageListeners.page.forEach((listener) => {
      if (listener.dependentSlice === slice) {
        listener.forceUpdate();
      }
    });
  };

  useEffect(() => {
    if (!isInitiated) {
      allPageListeners.page.push({
        listenerId: listenerId,
        dependentSlice: slice,
        forceUpdate,
      });
      listenerId++;
    }
  }, [isInitiated]);

  return [getter(), setter];
};

//AllObject Method

type ObjectSliceType = (value: IObject) => Partial<IObject>;

type IAllObjectsHook = (
  slice?: ObjectSliceType,
) => [Partial<IObject>[][], AllSetterType<Partial<IObject>[]>];

const allObjectListeners: IAllListeners = {
  page: [{ listenerId: 0, dependentSlice: undefined, forceUpdate: () => {} }],
};

export const useAllObjects: IAllObjectsHook = (slice) => {
  const [, forceUpdate] = useReducer((c: number) => c + 1, 0);

  const getter = useMemo(() => {
    if (slice) {
      return () =>
        projectData.pages.map((page) => page.objects.map((obj) => slice(obj)));
    }
    return () => projectData.pages.map((page) => page.objects);
  }, [slice]);

  const setter: AllSetterType<Partial<IObject>[]> = (value) => {
    // 해당 value를 포함하는 page를 찾음
    const pageContainingObject = projectData.pages.find((page) =>
      page.objects.find((obj) => value.find((v) => v.id === obj.id)),
    );

    if (pageContainingObject) {
      let updatedObjects: IObject[];
      if (slice) {
        updatedObjects = pageContainingObject.objects.map((obj) =>
          JSON.stringify(
            slice(value.find((v) => v.id === obj.id) as IObject),
          ) === JSON.stringify(slice(obj))
            ? obj
            : (value.find((v) => v.id === obj.id) as IObject),
        );
      } else {
        updatedObjects = pageContainingObject.objects.map((obj) =>
          JSON.stringify(value.find((v) => v.id === obj.id)) ===
          JSON.stringify(obj)
            ? obj
            : (value.find((v) => v.id === obj.id) as IObject),
        );
      }

      const updatedPages = projectData.pages.map((page) =>
        page.id === pageContainingObject.id
          ? { ...page, objects: updatedObjects }
          : page,
      );

      projectData = {
        ...projectData,
        pages: updatedPages,
      };

      forceUpdate();
    }
  };

  useEffect(() => {
    listeners.page.push({ listenerId, dependentId: null, forceUpdate });
    listenerId++;
  }, []);

  return [getter(), setter];
};

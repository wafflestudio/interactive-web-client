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

/**
 * 테스트를 위한 빈 프로젝트 데이터
 */
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
type ObjectListenerType = {
  listenerId: number;
  dependentParentId: number;
  dependentMyId: number;
  forceUpdate: () => void;
};
type IListeners = {
  page: PageListenerType[];
  object: ObjectListenerType[];
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

/**
 * 전체 프로젝트 데이터의 객체
 * @todo 서버에서 가져온 초기값 로드하는 함수 만들기
 */
let projectData: IProject = dummy;

const isInitiated = false;

/**
 * page, object의 listener 모음
 * @todo new Set()으로 리팩토링해서 리스너 중복 관리하기
 */
const listeners: IListeners = {
  page: [],
  object: [],
};
let listenerId = 0;

/*** Hooks ***/

/**
 * id를 이용하여 페이지 하나의 값을 가져오고 변경한다.
 *
 * @param {number} id 페이지의 id값
 * @return {[get, set, destroy]} [getState, setState, destroy] 반환. destroy는 해당 페이지를 삭제하는 함수.
 */
export const useSinglePage: IPageSingleDataHook = (id: number) => {
  const [, forceUpdate] = useReducer((c: number): number => c + 1, 0);
  const pageId = useRef<number>(id);

  /** page의 현재 값 가져오기 */
  const getter = () =>
    projectData.pages.find((page) => page.id === pageId.current) ?? null;

  /**
   * page의 값 변경하기
   * @param {Partial<IPage>} value page 객체의 일부(Partial)
   */
  const setter: SetterType<IPage> = (value) => {
    projectData = {
      ...projectData,
      pages: projectData.pages.map((page) =>
        page.id === pageId.current ? { ...page, ...value } : page,
      ),
    };
    listeners.page.forEach((listener) => {
      if (listener.dependentId === pageId.current) listener.forceUpdate();
    });
  };

  /** page 삭제하기 */
  const destroy = () => {
    projectData = {
      ...projectData,
      pages: projectData.pages.filter((page) => page.id !== pageId.current),
    };
    listeners.page.forEach((listener) => {
      listener.forceUpdate();
    });
  };

  /** 훅이 최초로 call 되었을 때 리스너를 등록
   * @todo 리스너 사용 방식 통일하기
   */
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

  return [getter(), setter, destroy];
};

/**
 * id를 이용하여 오브젝트 하나의 값을 가져오고 변경한다.
 *
 * @param {number} parentId 부모 page의 id값
 * @param {number} myId 오브젝트의 id값
 * @return {[get, set, destroy]} [getState, setState, destroy] 반환. destroy는 해당 object 삭제하는 함수.
 */
export const useSingleObject: IObjectSingleDataHook = (parentId, myId) => {
  const [, forceUpdate] = useReducer((c: number): number => c + 1, 0);
  const pageId = useRef<number>(parentId);
  const objectId = useRef<number>(myId);

  /** 부모 page 찾기 */
  const getParentPage = () =>
    projectData.pages.find((page) => page.id === pageId.current) ?? null;

  /** object의 현재 값 가져오기 */
  const getter = () => {
    const parent = getParentPage();
    if (!parent) {
      return null;
    }
    return (
      parent.objects.find((object) => object.id === objectId.current) ?? null
    );
  };

  /**
   * object의 값 변경하기
   * @param {Partial<IObject>} value object 객체의 일부(Partial)
   */
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

  /** page 삭제하기 */
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

  /** 훅이 최초로 call 되었을 때 리스너를 등록
   * @todo 리스너 사용 방식 통일하기
   */
  useEffect(() => {
    if (!isInitiated) {
      listeners.object.push({
        listenerId: listenerId,
        dependentParentId: pageId.current,
        dependentMyId: objectId.current,
        forceUpdate,
      });
      listenerId++;
    }
  }, [isInitiated]);

  return [getter(), setter, destroy];
};

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

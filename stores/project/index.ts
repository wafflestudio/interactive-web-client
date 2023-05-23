import { useEffect, useMemo, useReducer, useRef } from "react";
import { IObject, IPage, IProject } from "../../types/base";
import { isPartialDifferent, safeApply } from "./calculate";
import { dummyProject } from "./dummy";
import {
  AllObjectListenerType,
  AllPageListenerType,
  AllSetterType,
  IAllObjectHook,
  IAllPageHook,
  IListeners,
  ISingleObjectHook,
  ISinglePageHook,
  SingleObjectListenerType,
  SinglePageListenerType,
  SingleSetterType,
} from "./types";

/**
 * 테스트를 위한 빈 프로젝트 데이터
 */

/*** Data ***/

/**
 * 전체 프로젝트 데이터의 객체
 * @todo 서버에서 가져온 초기값 로드하는 함수 만들기
 */
let projectData: IProject = dummyProject;

const isInitiated = false;

/**
 * page, object의 listener 모음
 * @todo new Set()으로 리팩토링해서 리스너 중복 관리하기
 */
const listeners: IListeners = {
  allPage: [],
  singlePage: [],
  allObject: [],
  singleObject: [],
};
let listenerId = 0;

/*** Hooks ***/

/**
 * id를 이용하여 페이지 하나의 값을 가져오고 변경한다.
 *
 * @param {number} id 페이지의 id값
 * @return {[get, set, destroy]} [getState, setState, destroy] 반환. destroy는 해당 페이지를 삭제하는 함수.
 */
export const useSinglePage: ISinglePageHook = (targetId) => {
  const [, forceUpdate] = useReducer((c: number): number => c + 1, 0);
  const pageId = useRef<number>(targetId);

  /** page의 현재 값 가져오기 */
  const getter = () =>
    projectData.pages.find((page) => page.id === pageId.current) ?? null;

  /**
   * page의 값 변경하기
   * @param {Partial<IPage>} value page 객체의 일부(Partial)
   */
  const setter: SingleSetterType<IPage> = (value) => {
    projectData = {
      ...projectData,
      pages: projectData.pages.map((page) =>
        page.id === pageId.current ? { ...page, ...value } : page,
      ),
    };
    /** 리스너 작동 */
    const valueForSlice = value as IPage;
    listeners.singlePage.forEach((listener) => {
      if (listener.dependentId === pageId.current) listener.forceUpdate();
    });
    listeners.allPage.forEach((listener) => {
      if (!listener.dependentSlice) {
        listener.forceUpdate();
      } else if (listener.dependentSlice(valueForSlice) !== undefined);
      listener.forceUpdate();
    });
  };

  /** page 삭제하기 */
  const destroy = () => {
    projectData = {
      ...projectData,
      pages: projectData.pages.filter((page) => page.id !== pageId.current),
    };
    /** 리스너 작동 */
    listeners.allPage.forEach((listener) => {
      listener.forceUpdate();
    });
    listeners.singlePage.forEach((listener) => listener.forceUpdate());
  };

  /**
   * 훅이 최초로 call 되었을 때 리스너를 등록
   */
  useEffect(() => {
    if (!isInitiated) {
      listeners.singlePage.push({
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
export const useSingleObject: ISingleObjectHook = (
  targetObjectId,
  targetPageId,
) => {
  const [, forceUpdate] = useReducer((c: number): number => c + 1, 0);
  const pageId = useRef<number>(targetPageId);
  const objectId = useRef<number>(targetObjectId);

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
  const setter: SingleSetterType<IObject> = (value) => {
    const parent = getParentPage();
    if (!parent) return null;

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
    /**
     * 리스너 작동
     */
    const valueForSlice = value as IObject;
    listeners.singleObject.forEach((listener) => {
      if (
        listener.parentId === pageId.current &&
        listener.dependentId === objectId.current
      )
        listener.forceUpdate();
    });
    listeners.allObject.forEach((listener) => {
      if (!listener.dependentSlice) {
        listener.forceUpdate();
      } else if (listener.dependentSlice(valueForSlice) !== undefined)
        listener.forceUpdate();
    });
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
    /** 리스너 작동 */
    listeners.allObject.forEach((listener) => {
      listener.forceUpdate();
    });
    listeners.singleObject.forEach((listener) => listener.forceUpdate());
  };

  /** 훅이 최초로 call 되었을 때 리스너를 등록
   * @todo 리스너 사용 방식 통일하기
   */
  useEffect(() => {
    if (!isInitiated) {
      listeners.singleObject.push({
        listenerId: listenerId,
        dependentId: objectId.current,
        parentId: pageId.current,
        forceUpdate,
      });
      listenerId++;
    }
  }, [isInitiated]);

  return [getter(), setter, destroy];
};

/**
 * 모든 페이지 값 가져오기
 * @param slice 페이지 값 일부를 가져오는 slice 함수
 */
export const useAllPages: IAllPageHook = (slice) => {
  const [, forceUpdate] = useReducer((c: number): number => c + 1, 0);

  // useMemo로 렌더링 최적화
  const getter = useMemo(() => {
    if (slice) {
      return () => projectData.pages.map((page) => slice(page));
    }
    return () => projectData.pages;
  }, [slice]);

  const setter: AllSetterType<IPage> = (value) => {
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
    listeners.allPage.forEach((listener) => {
      if (listener.dependentSlice === slice) {
        listener.forceUpdate();
      }
    });
    listeners.singlePage.forEach((listener) => listener.forceUpdate());
  };

  useEffect(() => {
    if (!isInitiated) {
      listeners.allPage.push({
        listenerId: listenerId,
        dependentSlice: slice ?? null, //수정: 의미상 slice
        forceUpdate,
      });
      listenerId++;
    }
  }, [isInitiated]);

  return [getter(), setter];
};

/**
 * 전체 오브젝트를 가져오는 훅
 * @param pageId 부모 페이지 id
 * @param slice object의 일부를 가져오는 slice 함수
 */
export const useAllObjects: IAllObjectHook = (pageId, slice) => {
  const [, forceUpdate] = useReducer((c: number) => c + 1, 0);

  /** 부모 page 찾기 */
  const getParentPage = () =>
    projectData.pages.find((page) => page.id === pageId) ?? null;

  const getter: () => Partial<IObject>[] = useMemo(() => {
    const objects = getParentPage()?.objects;
    if (objects) {
      if (slice) {
        return () => objects.map((obj) => slice(obj));
      }
      return () => objects;
    }
    return () => [];
  }, [slice]);

  const setter: AllSetterType<IObject> = (value) => {
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
      /**
       * 리스너 작동
       */
      listeners.allObject.forEach((listener) => {
        if (listener.dependentSlice === slice) {
          listener.forceUpdate();
        }
      });
      listeners.singleObject.forEach((listener) => listener.forceUpdate());
    }
  };

  useEffect(() => {
    listeners.allObject.push({
      listenerId,
      dependentSlice: slice ?? null,
      parentId: pageId,
      forceUpdate,
    });
    listenerId++;
  }, []);

  return [getter(), setter];
};

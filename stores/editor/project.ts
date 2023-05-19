import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { IObject, IPage, IProject } from "../../types/base";

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

type SingleDataHookReturnType<T> = [T | null, SetterType<T>]; //useState랑 동일

type IPageSingleDataHook = (id: number) => SingleDataHookReturnType<IPage>;

/*** Data ***/
let projectData: IProject = dummy;
const isInitiated = false;
let listenerId = 0;

const listeners: IListeners = {
  page: [{ listenerId: 0, dependentId: 5, forceUpdate: () => {} }],
};

/*** Hooks ***/
export const useSinglePage: IPageSingleDataHook = (id: number) => {
  const [, forceUpdate] = useReducer((c: number): number => c + 1, 0);
  const pageId = useRef<number>(id);

  const getter =
    projectData.pages.find((page) => page.id === pageId.current) ?? null;
  const setter: SetterType<IPage> = (value) => {
    //(1. 값 비교: pageValue.current랑 새로 들어온 value랑 비교한다 -> 최적화 관련)
    //2. 전역 project 객체의 값을 찾아서 바꾼다
    projectData = {
      ...projectData,
      pages: projectData.pages.map((page) =>
        page.id === pageId.current ? { ...page, ...value } : page,
      ),
    };
    //3. listeners 배열에서 같은 페이지 아이디를 구독하고 있는 모든 리스너들을 업데이트 시킨다(forceUpdate 이용)
    listeners.page.forEach((listener) => {
      if (listener.dependentId === pageId.current) {
        listener.forceUpdate();
      }
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

  return [getter, setter];
};

//useSingleObject

//useAllPages, useAllObjects: 구현이 위에 꺼랑은 다를 듯

/***
 * 고민 거리
 * 1. useSingleObject와 Page 사이의 분리
 * 2. 값의 깊은 비교를 할까? (동일한 객체를 setter에 넣으면 아무 변화도 일어나지 않게)
 * 3. 전역 project 값으
 * 3a. 자바스크립트 내장 객체 Map 공부해보기
 */

type PageSliceType = (page: IPage) => Partial<IPage>;

type AllPagesReturnType<T> = [T[], SetterType<IPage[]>];

type IAllPagesHook = <T>(slice?: PageSliceType) => AllPagesReturnType<T>;

export const useAllPages: IAllPagesHook = (slice) => {
  const [, forceUpdate] = useReducer((c: number): number => c + 1, 0);

  const getter = useMemo(() => {
    if (slice) {
      return () => projectData.pages.map((page) => slice(page));
    }
    return () => projectData.pages;
  }, [slice]);

  const setter: SetterType<IPage[]> = (value) => {
    projectData = {
      ...projectData,
      pages: value,
    };

    listeners.page.forEach((listener) => {
      if (!listener.dependentId) {
        listener.forceUpdate();
      } else if (
        Array.isArray(listener.dependentId) &&
        listener.dependentId.some((id) => value.find((page) => page.id === id))
      ) {
        listener.forceUpdate();
      } else if (value.find((page) => page.id === listener.dependentId)) {
        listener.forceUpdate();
      }
    });
  };

  useEffect(() => {
    const id = listenerId++;
    listeners.page.push({
      listenerId: id,
      dependentId: -1,
      forceUpdate,
    });

    return () => {
      listeners.page = listeners.page.filter(
        (listener) => listener.listenerId !== id,
      );
    };
  }, []);

  return [getter(), setter];
};

type ObjectSliceType = (value: IObject) => Partial<IObject>;

type IObjectSingleDataHook = (id: number) => SingleDataHookReturnType<IObject>;

type IObjectAllDataHook = (
  slice?: ObjectSliceType,
) => SingleDataHookReturnType<IObject[]>;

export const useAllObjects: IObjectAllDataHook = (slice) => {
  const [, forceUpdate] = useReducer((c: number) => c + 1, 0);

  const getter = slice
    ? projectData.pages.map((page) => page.objects.map((obj) => slice(obj)))
    : projectData.pages.map((page) => page.objects);

  const setter = (value: Partial<IObject>) => {
    const pageContainingObject = projectData.pages.find((page) =>
      page.objects.some((obj) => obj.id === value.id),
    );

    if (pageContainingObject) {
      const updatedObjects = pageContainingObject.objects.map((obj) =>
        obj.id === value.id ? { ...obj, ...value } : obj,
      );
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

  return [getter, setter];
};

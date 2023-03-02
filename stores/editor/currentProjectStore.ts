import { createSlice } from "@reduxjs/toolkit";
import { IProject, IObject, IPage } from "../../types/base";

const initialState = {} as IProject;

const currentProjectStore = createSlice({
  name: "editor/currentProject",
  initialState,
  reducers: {
    setProject: (_, action: { payload: IProject }) => action.payload, // 프로젝트 세팅
    changeProjectMetadata: (
      state,
      action: { payload: Pick<IProject, "title"> },
    ) => {
      // 프로젝트 메타데이터(이름, 설명 등) 변경
      return { ...state, ...action.payload };
    },
    changePages: (state, action: { payload: Pick<IPage, "id" | "name">[] }) => {
      // 페이지 데이터 변경(오브젝트 제외, 현재는 페이지 이름)
      // Map(페이지 id, 페이지 변경 데이터)
      const pageToBeChangedMap = new Map<number, Pick<IPage, "name">>();
      action.payload.map((page) => pageToBeChangedMap.set(page.id, page));
      return {
        ...state,
        pages: state.pages.map((page) => {
          const pageContentToBeChanged = pageToBeChangedMap.get(page.id);
          return pageContentToBeChanged
            ? { ...page, ...pageContentToBeChanged }
            : page;
        }),
      };
    },
    changeObjects: (state, action: { payload: IObject[] }) => {
      // 오브젝트(통째로) 변경
      // Map(페이지 id, Map(오브젝트 id, 오브젝트 전체))
      const objectsToBeChangedByPageMap = new Map<
        number,
        Map<number, IObject>
      >();
      action.payload.map((object) => {
        // Map(오브젝트 id, 오브젝트 전체)
        const pageIdObjects =
          objectsToBeChangedByPageMap.get(object.page_id) ||
          (new Map() as Map<number, IObject>);
        pageIdObjects.set(object.id, object);
        if (pageIdObjects.size === 1)
          objectsToBeChangedByPageMap.set(object.page_id, pageIdObjects);
      });

      return {
        ...state,
        pages: state.pages.map((page) => {
          const objectsToBeChanged = objectsToBeChangedByPageMap.get(page.id);
          if (objectsToBeChanged) {
            return {
              ...page,
              objects: page.objects.map((object) => {
                const changedObject = objectsToBeChanged.get(object.id);
                return changedObject || object;
              }),
            };
          } else return page;
        }),
      };
    },
  },
});

export const { setProject, changeProjectMetadata, changePages, changeObjects } =
  currentProjectStore.actions;

export default currentProjectStore.reducer;

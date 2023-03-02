import { createSlice } from "@reduxjs/toolkit";
import { IProject, IObject, IPage } from "../../types/base";

const initialState = {} as IProject;

const currentProjectStore = createSlice({
  name: "editor/currentProject",
  initialState,
  reducers: {
    setProject: (_, action: { payload: IProject }) => action.payload,
    changeProjectMetadata: (state, action: { payload: Partial<IProject> }) => {
      return { ...state, ...action.payload };
    },
    changePages: (state, action: { payload: IPage[] }) => {
      return {
        ...state,
        pages: state.pages.map((page) => {
          const pageToBeChanged = action.payload.find(
            (changedPage) => changedPage.id === page.id,
          );
          if (pageToBeChanged) {
            return pageToBeChanged;
          } else return page;
        }),
      };
    },
    changeObjects: (state, action: { payload: IObject[] }) => {
      const objectsToChangeByPageMap = new Map<number, Map<number, IObject>>();
      action.payload.map((object) => {
        const pageIdObjects =
          objectsToChangeByPageMap.get(object.page_id) ||
          (new Map() as Map<number, IObject>);
        objectsToChangeByPageMap.set(
          object.page_id,
          pageIdObjects.set(object.id, object),
        );
      });

      return {
        ...state,
        pages: state.pages.map((page) => {
          const objectsToBeChanged = objectsToChangeByPageMap.get(page.id);
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

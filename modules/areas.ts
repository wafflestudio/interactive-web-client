// div(container) 안에 있는 svg 모음입니다

import { AreaDataType } from "../dummies/dummyInterface";

const UPDATE_AREA = "areas/UPDATE_Area" as const;
const SAVE_AREAS = "areas/GET_areaS" as const;

export const saveAreas = (areas: AreaDataType[]) => ({
  type: SAVE_AREAS,
  payload: areas,
});

export const updateArea = (targetArea: AreaDataType) => ({
  type: UPDATE_AREA,
  payload: targetArea,
});

type AreasAction = ReturnType<typeof saveAreas> | ReturnType<typeof updateArea>;

const initialState: AreaDataType[] = [];

const areas = (
  state: AreaDataType[] = initialState,
  action: AreasAction,
): AreaDataType[] => {
  switch (action.type) {
    case SAVE_AREAS:
      return action.payload;
    case UPDATE_AREA:
      return state.map((item) =>
        item.id !== action.payload.id ? item : action.payload,
      );
    default:
      return state;
  }
};

export default areas;

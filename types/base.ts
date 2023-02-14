type TupleObject = Record<string, readonly (number | boolean | string)[]>;
type ObjectToEnum<T extends TupleObject> = {
  [Key in keyof T]: T[Key][number];
};

export type PickByType<T, U> = {
  [P in keyof T as T[P] extends U ? (U extends T[P] ? P : never) : never]: T[P];
};

export type IProject = {
  readonly id: number;
  readonly owner_id: number;
  title: string;
  variables: string[]; //미정
  pages: IPage[];
  events: string[]; //미정
};

export type IPage = {
  readonly id: number;
  name: string;
  readonly projectId: number;
  objects: IObject[];
};

type ICommonObject = {
  readonly id: number;
  name: string;
  isInteractive: boolean;
  // position: { x: number; y: number };
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  zIndex: number;
  opacity: number;
};
export type ITextObject = ICommonObject & {
  type: "text";
  textContent: string;
  fontSize: number;
};
export type IImageObject = ICommonObject & {
  type: "image";
  imageSource: string;
};
export type IObject = ITextObject | IImageObject;

export const manipulate =
  <S, T extends string | number | boolean>(data: S) =>
  (property: keyof PickByType<S, T>, value: T): S => {
    return { ...data, [property]: value };
  };

/*
const dummyProject: IProject = {
  id: 0,
  owner_id: 0,
  events: [],
  variables: [],
  title: "abc",
  pages: [],
};
manipulate<IProject, string>(dummyProject)("title", "newName");
*/

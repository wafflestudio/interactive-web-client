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
  variables: Record<string, number | string | boolean>;
  pages: IPage[];
  events: string[];
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
  fontFamily: string;
  lineHeight: number;
  letterSpacing: number;
  color: string;
  strokeWidth: number;
  strokeColor: string;
  backgroundColor: string;
  borderWidth: number;
  borderColor: string;
};
export type IImageObject = ICommonObject & {
  type: "image";
  imageSource: string;
  isReversed: boolean;
  rotateDegree: number;
};
export type IObject = ITextObject | IImageObject;

export const manipulate =
  <S, T extends string | number | boolean>(data: S) =>
  (property: keyof PickByType<S, T>, value: T): S => {
    return { ...data, [property]: value };
  };

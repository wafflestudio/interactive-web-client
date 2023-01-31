type TupleObject = Record<string, readonly (number | boolean | string)[]>;
type ObjectToEnum<T extends TupleObject> = {
  [Key in keyof T]: T[Key][number];
};
type PickByType<T, U> = { [P in keyof T as T[P] extends U ? P : never]: T[P] };

/*********** ***********/

type TestPlain = {
  id: number;
  name: string;
};

const testEnum = {
  selectable: ["option1", "option2"],
} as const;

type TestEnum = ObjectToEnum<typeof testEnum>;

export type ITest = TestPlain & TestEnum;

const testInstance: ITest = {
  id: 1,
  name: "oldName",
  selectable: "option1",
};

const manipulate =
  <S, T extends string | number | boolean>(data: S) =>
  (property: keyof PickByType<S, T>, value: T): S => {
    return { ...data, [property]: value };
  };

const manipulate2 =
  <T extends TupleObject>(data: T) =>
  (property: keyof T, value: T[]): T => {
    return { ...data, [property]: value };
  };

manipulate<TestPlain, string>(testInstance)("name", "newName");
manipulate2<TestEnum>(testInstance)("selectable", "option2");

/*
manipulate2<TestEnum>(testInstance)()
 */

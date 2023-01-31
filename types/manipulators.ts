import { IPage, PageStringProperty } from "./page";
import { IProject, ProjectStringProperty } from "./project";

type ProjectStringManipulator = (
  data: IProject,
  property: ProjectStringProperty,
  value: string,
) => IProject;

type PageStringManipulator = (
  data: IPage,
  property: PageStringProperty,
  value: string,
) => IProject;

//  | ((data: IPage, property: PageStringProperty, value: string) => IPage);

export const manipulateStringProperty:
  | ProjectStringManipulator
  | PageStringManipulator = (data, property, value) => ({
  ...data,
  [property]: value,
});

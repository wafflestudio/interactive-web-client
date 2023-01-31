import { IPage } from "./page";

export type ProjectStringProperty = "title";
export type IProject = Record<ProjectStringProperty, string> & { pages: IPage };

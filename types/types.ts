import React from "react";
import {
  GeometryType,
  ObjectDataType,
  SvgDataType,
} from "../dummies/dummyInterface";

export interface UserDataType {
  user_id: string;
  username: string;
  email: string;
  date_joined: string;
  isLoggedIn: boolean;
}

export interface UserPutType {
  username: string;
  email: string;
}

export interface ProjectDataType {
  id: number;
  writer: UserDataType;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface CategoryType {
  id: number;
  navigator: string;
  name: string;
  path: string;
}

export interface ModalDataType {
  type: ModalType;
  target?: ObjectDataType;
}

export interface ObjectDataType {
  id: number; //중복 없게
  name: string;
  src: string;
  geometry: GeometryType;
  opacity: number;
  tag: string[];
  visibility: boolean;
  zIndex?: number;
}

export enum ModalType {
  OBJECT_SIMPLE_INFO = "object_simple_info",
  OBJECT_DETAIL_INFO = "object_detail_info",
}

export interface ActionDataType {
  text: string;
  function: () => void;
}

export type InteractionDataType = ObjectDataType;
export type MouseEventType = React.MouseEvent;

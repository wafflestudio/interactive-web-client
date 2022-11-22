import React from "react";

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
  object_name: string;
  tag: unknown;
  visibility: boolean;
  z_index: number;
  opacity: number;
  src_url: string;
  x: number;
  y: number;
  h: number;
  w: number;
  image: File | null;
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

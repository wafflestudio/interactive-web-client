import React from "react";
import { ObjectDataType } from "../dummies/dummyInterface";

export interface UserDataType {
  isLoggedIn: boolean;
  user_id: string | null;
  username: string | null;
  email: string | null;
  date_joined: string | null;
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

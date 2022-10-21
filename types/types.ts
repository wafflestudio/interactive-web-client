import React from "react";
import { ObjectDataType } from "../dummies/dummyInterface";

export interface UserDataType {
  user_id: string;
  username: string;
  email: string | null;
  date_joined: string;
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

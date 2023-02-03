import { Dispatch, SetStateAction } from "react";

export type ButtonProps = {
  text: string;
  onClick: Dispatch<SetStateAction<unknown>>;
};

export type TagButtonProps = {
  dark: boolean;
} & ButtonProps;

export type ToggleButtonProps = {
  active: boolean;
  state: boolean;
} & TagButtonProps;

export type CheckboxButtonProps = {
  active: boolean;
  withIcon: boolean;
  iconSrc: undefined | string;
} & TagButtonProps;

export type ClickableButtonProps = {
  big: boolean;
} & CheckboxButtonProps;

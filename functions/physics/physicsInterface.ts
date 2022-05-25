import { collectVariableUsage } from "tsutils";

export interface Scale {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface GridScale extends Scale {
  column: number;
  row: number;
}

export interface GridPosition {
  x: number;
  y: number;
}

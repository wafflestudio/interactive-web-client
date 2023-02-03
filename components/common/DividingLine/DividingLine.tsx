import { relative } from "path";
import { useState } from "react";
import { IObject } from "../../../types/base";
import styles from "./DividingLine.module.scss";

type Props = {
  vertical: boolean;
};

const DividingLine = ({ vertical }: Props) => {
  return (
    <div className={vertical ? styles.verticalLine : styles.horizontalLine} />
  );
};
export default DividingLine;

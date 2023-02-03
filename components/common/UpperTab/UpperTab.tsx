import { useState } from "react";
import styles from "./UpperTab.module.scss";

type Props = {
  number: number; //Number of tabs
  names: string[]; //Name of each tab
  iconSrcs?: string[]; //Icon src of each tab
  children: JSX.Element[];
};

const UpperTab = ({ number, names, iconSrcs, children }: Props) => {
  const [selectedTab, SetSelectedTab] = useState(0);
  if (number !== names.length || (iconSrcs && number !== iconSrcs.length)) {
    return <div>탭의 개수가 제대로 지정되지 않았습니다.</div>;
  }
  return (
    <div
      className={styles.container}
      style={{ minWidth: `calc(${number} * 110px)` }}
    >
      <div className={styles.box}>{children[selectedTab]}</div>
      <div className={styles.tabContainer}>
        {names.map((name, i) => (
          <div
            className={styles.shadowShield} //remove bottom shadow
            style={{
              left: `calc(${i} * -20px)`,
              width: `calc(100% / ${number} + 20px)`,
              maxWidth: "155px",
              minWidth: "110px",
            }}
          >
            <div
              className={
                i === selectedTab ? styles.selectedTab : styles.unselectedTab
              }
              onClick={() => {
                SetSelectedTab(i);
              }}
            >
              {iconSrcs && (
                <img
                  src={iconSrcs[i]}
                  style={{ width: "16px", height: "16px", marginRight: "5px" }}
                />
              )}
              <span style={{ textOverflow: "ellipses" }}>{name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default UpperTab;

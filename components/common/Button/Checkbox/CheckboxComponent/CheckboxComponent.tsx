import React from "react";
import styles from "../../Button.module.scss";
import ClickableButton from "../../ClickableButton/ClickableButton";

const CheckboxComponent = () => {
  const [checked, setChecked] = useState<{ [key]: boolean }>({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
  });
  return (
    <div className={styles.selectAllButton}>
      <ClickableButton
        text={"모두 선택 해제"}
        active={false}
        withIcon={false}
        big={false}
        onClick={}
      />
    </div>
  );
};

export default CheckboxComponent;

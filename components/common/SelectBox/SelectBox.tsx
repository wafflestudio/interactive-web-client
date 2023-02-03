import styles from "./SelectBox.module.scss";
const SelectBox = () => {
  return (
    <div className={styles.Wrapper}>
      <select className={styles.SelectBox}>
        <option className={styles.Option}>첫번째</option>
        <option className={styles.Option}>두번째</option>
        <option className={styles.Option}>세번째</option>
      </select>
      <div className={styles.arrow} />
    </div>
  );
};

export default SelectBox;

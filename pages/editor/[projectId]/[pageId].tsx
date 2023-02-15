import styles from "./EditorPage.module.scss";
const EditorPage = () => {
  return (
    <main className={styles.container}>
      <div className={styles.tabs} />
      <div className={styles.workSpace}>
        <div className={styles.toolbar} />
        <div className={styles.canvasWrapper}>canvas</div>
        <div className={styles.toolbar} />
      </div>
    </main>
  );
};

export default EditorPage;

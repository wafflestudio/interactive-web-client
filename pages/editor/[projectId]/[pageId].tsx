import PixiCanvas from "../../../components/Editor/PixiCanvas/PixiCanvas";
import ToolBar from "../../../components/Editor/ToolBar/ToolBar";
import styles from "./EditorPage.module.scss";

const EditorPage = () => {
  return (
    <main className={styles.container}>
      <div className={styles.tabs} />
      <div className={styles.workSpace}>
        <div className={styles.toolbar} />
        <div className={styles.canvasWrapper}>
          <PixiCanvas />
        </div>
        <ToolBar />
      </div>
    </main>
  );
};

export default EditorPage;

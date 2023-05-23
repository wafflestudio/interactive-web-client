import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PixiCanvas from "../../../components/Editor/PixiCanvas/PixiCanvas";
import ToolBar from "../../../components/Editor/ToolBar/ToolBar";
import styles from "./EditorPage.module.scss";

const EditorPage = () => {
  const router = useRouter();
  const [selectedPageId, setSelectedPageId] = useState<number | null>(null);
  const [selectedObjectId, setSelectedObjectId] = useState<number | null>(null);

  useEffect(() => {
    const currentPageId = Number(router.query.pageId);
    setSelectedPageId(isNaN(currentPageId) ? null : currentPageId);
  }, [router.query]);

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

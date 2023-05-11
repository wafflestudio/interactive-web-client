import { useSingleObject, useSinglePage } from "../../../stores/editor/project";
import NumberBox from "../../common/NumberBox/NumberBox";
import styles from "./ToolBar.module.scss";

const ToolBar = () => {
  const [page, setPage] = useSinglePage(1);
  const a = useSingleObject(1, 1);
  if (!page) {
    return <div>no page selected</div>;
  }
  return (
    <div className={styles.ToolBar}>
      <input
        type="text"
        value={page.name}
        onChange={(e) => setPage({ name: e.target.value })}
      />
    </div>
  );
};

export default ToolBar;

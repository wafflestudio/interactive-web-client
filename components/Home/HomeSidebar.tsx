import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { ProjectDataType } from "../../types/types";
import styles from "./HomePage.module.scss";

interface HomeSidebarProps {
  setIsSidebar: (bool: boolean) => void;
}

const HomeSidebar = ({ setIsSidebar }: HomeSidebarProps) => {
  const [projects, setProjects] = useState<ProjectDataType[]>([]);
  const [isTitleModalOpen, setIsTitleModalOpen] = useState<boolean>(false);
  const [titleInput, setTitleInput] = useState<string>("새 프로젝트");

  const onLoadProjects = async () => {
    try {
      const { data } = await api._getmyproject();
      console.log(data);
      setProjects(data);
    } catch (e) {
      console.log(e);
    }
  };
  const onAddProject =
    (title: string): React.FormEventHandler<HTMLFormElement> =>
    async (e) => {
      e.preventDefault();
      try {
        const { data } = await api._postproject(title);
        console.log(data);
        onLoadProjects();
      } catch (e) {
        console.log(e);
      }
    };

  const onClickProject =
    (id: number): React.MouseEventHandler<HTMLLIElement> =>
    async (e) => {
      try {
        const { data } = await api._getProject(id);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };

  useEffect(() => {
    onLoadProjects();
  }, []);

  return (
    <aside className={styles.homeSidebar}>
      <button
        className={styles.closeButton}
        onClick={() => {
          setIsSidebar(false);
        }}
      >
        {"<<"}
      </button>
      <div className={styles.label}>내 프로젝트</div>
      <ul className={styles.projectList}>
        {projects.map((project) => (
          <li
            className={styles.projectItem}
            key={project.id}
            onClick={onClickProject(project.id)}
          >
            {project.title}
          </li>
        ))}
      </ul>
      <button
        className={styles.addButton}
        onClick={() => {
          setIsTitleModalOpen(true);
        }}
      >
        + 새 프로젝트 만들기
        {isTitleModalOpen && (
          <form className={styles.addForm} onSubmit={onAddProject(titleInput)}>
            <input
              value={titleInput}
              onChange={(e) => {
                setTitleInput(e.target.value);
              }}
            />
            <button type="submit">시작</button>
          </form>
        )}
      </button>
    </aside>
  );
};
export default HomeSidebar;

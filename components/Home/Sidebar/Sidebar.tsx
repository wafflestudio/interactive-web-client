import { useEffect, useState } from "react";
import { api } from "../../../api/api";

import {
  useGetMyProjectQuery,
  usePostMyProjectMutation,
} from "../../../modules/api/projectApi";
import { ProjectDataType } from "../../../types/types";
import { FetchableComponent } from "../../common/FetchableComponent";
import styles from "./Sidebar.module.scss";

interface HomeSidebarProps {
  setIsSidebar: (bool: boolean) => void;
}
interface ProjectsListProps {
  projects: ProjectDataType[] | undefined;
  onClickProject: (id: number) => React.MouseEventHandler<HTMLLIElement>;
}

const ProjectsLists = ({ projects, onClickProject }: ProjectsListProps) => (
  <ul className={styles.projectList}>
    {projects?.map((project) => (
      <li
        className={styles.projectItem}
        key={project.id}
        onClick={onClickProject(project.id)}
      >
        {project.title}
      </li>
    ))}
  </ul>
);

const Sidebar = ({ setIsSidebar }: HomeSidebarProps) => {
  const [isTitleModalOpen, setIsTitleModalOpen] = useState<boolean>(false);
  const [titleInput, setTitleInput] = useState<string>("새 프로젝트");
  const [postProject, { error: postProjectError }] = usePostMyProjectMutation();
  const { data: projects, isFetching } = useGetMyProjectQuery();

  const onAddProject =
    (title: string): React.FormEventHandler<HTMLFormElement> =>
    async (e) => {
      e.preventDefault();
      try {
        await postProject({ title: title });
      } catch (e) {
        console.log(e);
      }
    };

  const onClickProject =
    (id: number): React.MouseEventHandler<HTMLLIElement> =>
    async () => {
      try {
        const { data } = await api._getProject(id);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };

  useEffect(() => {
    //onLoadProjects();
    console.log(projects);
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

      <FetchableComponent
        data={projects}
        isFetching={isFetching}
        successComponent={
          <ProjectsLists projects={projects} onClickProject={onClickProject} />
        }
        failComponent={<div>no projects</div>}
      />

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
export default Sidebar;

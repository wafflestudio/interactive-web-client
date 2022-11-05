import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useGetProjectQuery } from "../../modules/api/projectApi";
import styles from "./Project.module.scss";

const Project: NextPage = () => {
  const router = useRouter();
  const { projectId: id } = router.query;

  const { data, isFetching } = useGetProjectQuery(Number(id));

  return <article className={styles.wrapper}></article>;
};

export default Project;

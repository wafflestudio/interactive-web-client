import styles from "./Box.module.scss";

type Props = {
  children: JSX.Element;
};

const Box = ({ children }: Props) => {
  return <div className={styles.container}>{children}</div>;
};
export default Box;

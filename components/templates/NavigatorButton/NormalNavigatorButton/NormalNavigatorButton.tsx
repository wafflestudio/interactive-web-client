import styles from "./NormalNavigatorButton.module.scss";

interface NormalNavigationButtonProps {
  onButtonClick: () => void;
  isSelected: boolean;
  text: string;
  imageSrc?: string;
}

const NormalNavigatorButton = ({
  onButtonClick,
  text,
  isSelected,
  imageSrc,
}: NormalNavigationButtonProps) => {
  return (
    <div
      className={`${styles.wrapper} ${isSelected ? styles.selected : ""}`}
      onClick={onButtonClick}
    >
      {text}
      {imageSrc && (
        <img src={imageSrc} alt={`${text} 이미지`} className={styles.icon} />
      )}
    </div>
  );
};

export default NormalNavigatorButton;

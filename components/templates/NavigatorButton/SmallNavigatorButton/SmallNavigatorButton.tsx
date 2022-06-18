import styles from "./SmallNavigatorButton.module.scss";

interface SmallNavigationButtonProps {
  onButtonClick: () => void;
  isSelected: boolean;
  text: string;
  imageSrc?: string;
}

const SmallNavigatorButton = ({
  onButtonClick,
  text,
  isSelected,
  imageSrc,
}: SmallNavigationButtonProps) => {
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

export default SmallNavigatorButton;

import styles from './CustomButton.module.scss';

interface CustomButtonProps { }

export const CustomButton = ({ }: CustomButtonProps) => (
  <div className={styles.CustomButton} data-testid="CustomButton">
    CustomButton Component
  </div>
);

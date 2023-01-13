import styles from './CustomInput.module.scss';

interface CustomInputProps { }

export const CustomInput = ({ }: CustomInputProps) => (
  <div className={styles.CustomInput} data-testid="CustomInput">
    CustomInput Component
  </div>
);

import styles from './CustomSelect.module.scss';

type options = {
  value: string;
  name: string;
};

interface CustomSelectProps {
  options: Array<options>;
  defaultValue: string;
  value: string;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const CustomSelect = ({
  options,
  defaultValue,
  value,
  onChange,
  ...others
}: CustomSelectProps) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e)}
      {...others}
      className={styles.customSelect}
    >
      <option disabled value="Any">
        {defaultValue}
      </option>
      {options.map((option) => {
        return (
          <option value={option.value} key={option.value}>
            {option.name}
          </option>
        );
      })}
    </select>
  );
};

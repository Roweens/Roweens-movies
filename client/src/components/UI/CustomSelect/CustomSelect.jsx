import styles from './CustomSelect.module.scss';

export const CustomSelect = ({
  options,
  defaultValue,
  value,
  onChange,
  ...others
}) => {
  return (
    <select value={value} onChange={(e) => onChange(e)} {...others}>
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

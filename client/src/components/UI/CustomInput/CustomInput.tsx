import styles from './CustomInput.module.scss';

interface CustomInputProps {
  type: string;
  id?: string;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | File) => void;
  label: string;
  labelContent?: string;
  required?: boolean;
  placeholder?: string;
}

export const CustomInput = ({
  type,
  id,
  name,
  onChange,
  label,
  labelContent,
  ...others
}: CustomInputProps) => {
  const inputLabelClass =
    type === 'file' ? styles.customFileInputLabel : styles.customTextInputLabel;
  const inputClass =
    type === 'file' ? styles.customFileInput : styles.customTextInput;

  return (
    <div className={styles.customInputWrapper}>
      {label && (
        <label htmlFor={id} className={inputLabelClass}>
          {labelContent}
          {type === 'file' && (
            <i
              className={styles.customInputIcon + ' fa-solid fa-file-import'}
            ></i>
          )}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={id}
        onChange={
          type === 'file'
            ? (e) => {
                onChange(e!.target!.files![0]);
              }
            : (e) => onChange(e)
        }
        className={inputClass}
        {...others}
      />
    </div>
  );
};

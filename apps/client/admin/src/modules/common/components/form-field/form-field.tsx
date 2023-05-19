import styles from './form-field.module.scss';

/* eslint-disable-next-line */
export interface FormFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  children: string;
}

export function FormField({ children, ...props }: FormFieldProps) {
  return (
    <>
      <label htmlFor={props.id}>{children}</label>
      <input {...props} type={props.type ?? 'text'} />
    </>
  );
}

export default FormField;

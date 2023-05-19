import { PropsWithChildren } from 'react';
import styles from './form-field.module.scss';

/* eslint-disable-next-line */
export interface FormFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

export function FormField({
  children,
  prefix,
  suffix,
  ...props
}: PropsWithChildren<FormFieldProps>) {
  return (
    <>
      <label htmlFor={props.id} className={styles['label']}>
        {prefix}
        {children}
        {suffix}
      </label>
      <input {...props} type={props.type ?? 'text'} />
    </>
  );
}

export default FormField;

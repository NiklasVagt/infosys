import { PropsWithChildren } from 'react';
import styles from './form-field.module.scss';
import classNames from 'classnames';

/* eslint-disable-next-line */
export interface FormFieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement & HTMLTextAreaElement>,
    'prefix'
  > {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  area?: boolean;
}

export function FormField({
  children,
  prefix,
  suffix,
  area,
  ...props
}: PropsWithChildren<FormFieldProps>) {
  return (
    <>
      <label
        htmlFor={props.id}
        className={classNames(styles['label'], { [styles['start']]: area })}
      >
        {prefix}
        {children}
        {suffix}
      </label>
      {area ? (
        <textarea rows={10} {...props}></textarea>
      ) : (
        <input {...props} type={props.type ?? 'text'} />
      )}
    </>
  );
}

export default FormField;

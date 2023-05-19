import { Icon } from '@iconify/react';
import styles from './form.module.scss';
import classNames from 'classnames';
import { PropsWithChildren } from 'react';

export interface FormProps {
  saveBtn?: boolean;
  deleteBtn?: boolean;
  error?: string | null;
  handleSave: (e: React.FormEvent) => void;
  handleDelete?: (e: React.FormEvent) => void;
}

export function Form({
  children,
  saveBtn,
  deleteBtn,
  error,
  handleDelete,
  handleSave,
}: PropsWithChildren<FormProps>) {
  return (
    <form className={classNames('form')}>
      {/* form-fields */}
      {children}

      {/* error */}
      {error && (
        <div className={classNames('error-message')}>
          <Icon icon="carbon:warning" /> {error}
        </div>
      )}

      {/* actions */}
      <ul className={classNames('actions')}>
        {/* save */}
        {handleSave && saveBtn && (
          <li>
            <button
              type="submit"
              className="secondary ghost inline-icon"
              onClick={handleSave}
            >
              <Icon icon="carbon:save"></Icon>
              <span>Save</span>
            </button>
          </li>
        )}

        {/* delete */}
        {handleDelete && deleteBtn && (
          <li>
            <button
              type="button"
              className="error ghost inline-icon"
              onClick={handleDelete}
            >
              <Icon icon="carbon:delete"></Icon>
              <span>Delete</span>
            </button>
          </li>
        )}
      </ul>
    </form>
  );
}

export default Form;

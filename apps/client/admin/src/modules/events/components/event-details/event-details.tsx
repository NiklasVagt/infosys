import { useMemo, useState } from 'react';
import styles from './event-details.module.scss';
import { useNavigate, useRevalidator } from 'react-router-dom';
import { useUpsertEvent } from '../../api/use-upsert-event';
import { useDeleteEvent } from '../../api/use-delete-event';
import classNames from 'classnames';
import { Icon } from '@iconify/react';
import { EventDto } from '@infosys/dtos';
import FormField from '../../../common/components/form-field/form-field';

/* eslint-disable-next-line */
export interface EventDetailsProps extends EventDto {}

export function EventDetails({ id, ...props }: EventDetailsProps) {
  console.log(props.date);
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [author, setAuthor] = useState(props.author);
  const [date, setDate] = useState(props.date);

  const { revalidate } = useRevalidator();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>();

  const [, upsertError, create, update] = useUpsertEvent();
  const [, deleteError, remove] = useDeleteEvent();

  useMemo(() => {
    setError(upsertError || deleteError);
  }, [upsertError, deleteError]);

  const isNewEvent = +id === -1;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isNewEvent) {
      const event = await create({ name, description, author, date });
      if (event) navigate(`/events/${event?.id}`);
    } else {
      await update(id, { name, description, author, date });
    }

    revalidate();
  };

  const handleDelete = async () => {
    await remove(id);
    navigate('/events');
    revalidate();
  };

  return (
    <form className={classNames('form')}>
      {/* id */}
      {!isNewEvent && (
        <FormField id="user-id" type="text" disabled value={id}>
          ID
        </FormField>
      )}

      {/* name */}
      <FormField
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      >
        Name
      </FormField>

      {/* description */}
      <FormField
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      >
        Description
      </FormField>

      {/* author */}
      <FormField
        id="author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      >
        Author
      </FormField>

      {/* date */}
      <FormField
        id="date"
        type="datetime-local"
        value={date.toISOString().slice(0, 16)}
        onChange={(e) => setDate(new Date(e.target.value))}
      >
        Date
      </FormField>

      {/* error */}
      {error && (
        <div className={classNames('error-message', styles['error'])}>
          {error}
        </div>
      )}

      {/* actions */}
      <ul className={classNames('actions')}>
        {/* save */}
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

        {/* delete */}
        {!isNewEvent && (
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

export default EventDetails;

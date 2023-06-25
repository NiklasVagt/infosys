import { PersonDto } from '@infosys/dtos';
import { useMemo, useState } from 'react';
import { Form, useNavigate, useRevalidator } from 'react-router-dom';
import { useUpsertPerson } from '../../api/use-upsert-person';
import { useDeletePerson } from '../../api/use-delete-person';
import FormField from '../../../common/components/form-field/form-field';
import { Icon } from '@iconify/react';

/* eslint-disable-next-line */
export interface PersonDetailsProps extends PersonDto {}

export function PersonDetails({ id, ...props }: PersonDetailsProps) {
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [occupation, setOccupation] = useState(props.occupation);

  const { revalidate } = useRevalidator();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>();

  const [, upsertError, create, update] = useUpsertPerson();
  const [, deleteError, remove] = useDeletePerson();

  useMemo(() => {
    setError(upsertError || deleteError);
  }, [upsertError, deleteError]);

  const isNewPerson = +id === -1;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isNewPerson) {
      const person = await create({ firstName, lastName, occupation });
      if (person) navigate(`/persons/${person?.id}`);
    } else {
      await update(id, { firstName, lastName, occupation });
    }

    revalidate();
  };

  const handleDelete = async () => {
    await remove(id);
    navigate('/persons');
    revalidate();
  };

  return (
    <Form
      {...{
        handleSave,
        handleDelete,
        error,
        saveBtn: true,
        deleteBtn: !isNewPerson,
      }}
    >
      {/* id */}
      {!isNewPerson && (
        <FormField
          id="person-id"
          type="text"
          disabled
          value={id}
          prefix={<Icon icon="carbon:id" />}
        >
          ID
        </FormField>
      )}
      {/* firstName */}
      <FormField
        id="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        prefix={<Icon icon="carbon:align-box-top-left" />}
      >
        First Name
      </FormField>
      {/* lastName */}
      <FormField
        id="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        prefix={<Icon icon="carbon:align-box-bottom-left" />}
      >
        Last Name
      </FormField>
      {/* occupation */}
      <FormField
        id="occupation"
        value={occupation}
        onChange={(e) => setOccupation(e.target.value)}
        prefix={<Icon icon="carbon:user-identification" />}
      >
        Occupation
      </FormField>
    </Form>
  );
}

export default PersonDetails;

import useForm from '@hooks/useForm';
import React from 'react';
import { phoneValidate } from '../Control/validate';
import { Form, PhoneField, TextField } from '../Control';
import { useAuthContext } from '@context/authContext';
import { Button } from '@components/Common';

const KEY_FORM = {
  NAME: 'username',
  PHONE: 'phone_number',
};

interface UpdateProfileFormProps {
  onHideUpdateForm: () => void;
}
export default function UpdateProfileForm({
  onHideUpdateForm,
}: UpdateProfileFormProps) {
  const { user, handleUpdateProfile } = useAuthContext();
  const { values, onSubmit, onChange, errors } = useForm({
    initValues: {
      [KEY_FORM.NAME]: user.username,
      [KEY_FORM.PHONE]: user.phone,
    },
    onCallApi: async ({ form, data }) => {
      handleUpdateProfile({ form, data });
      onHideUpdateForm();
    },
    validate: {
      [KEY_FORM.NAME]: [
        { rule: 'required', message: 'User name cannot be empty' },
      ],
      [KEY_FORM.PHONE]: phoneValidate,
    },
  });

  return (
    <Form onSubmit={onSubmit} autoCompleted="off">
      <TextField
        name={KEY_FORM.NAME}
        values={values}
        placeholder="Enter you"
        label="User name"
        onChange={onChange}
        errorMessage={errors[KEY_FORM.NAME as 'username']}
      />
      <PhoneField
        name={KEY_FORM.PHONE}
        values={values}
        label="Mobile phone"
        onChange={onChange}
        errorMessage={errors[KEY_FORM.PHONE as 'phone_number']}
      />
      <Button typeClass="button--primary" type="submit">
        Update
      </Button>
    </Form>
  );
}

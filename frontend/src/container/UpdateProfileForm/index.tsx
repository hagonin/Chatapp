import React from 'react';
import { useFormik } from 'formik';
import { Form, PhoneField, TextField } from '@components/Form/Control';
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
  const { handleSubmit, values, errors, handleChange, isSubmitting } =
    useFormik({
      initialValues: {
        [KEY_FORM.NAME]: '',
        [KEY_FORM.PHONE]: '',
      },
      onSubmit: values => {
        console.log(values);
      },
    });

  return (
    <Form onSubmit={handleSubmit} autoCompleted="off">
      <TextField
        name={KEY_FORM.NAME}
        values={values}
        placeholder="Enter you"
        label="User name"
        onChange={handleChange}
        errorMessage={errors[KEY_FORM.NAME]}
      />
      <PhoneField
        name={KEY_FORM.PHONE}
        values={values}
        label="Mobile phone"
        onChange={handleChange}
        errorMessage={errors[KEY_FORM.PHONE]}
      />
      <Button typeClass="button--primary" type="submit">
        Update
      </Button>
    </Form>
  );
}
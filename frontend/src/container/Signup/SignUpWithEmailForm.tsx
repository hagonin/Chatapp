import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  PasswordError,
  PasswordField,
  TextField,
} from '@components/Form/Control';

import { Button } from '@components/Common';
import { useFormik } from 'formik';
import { AuthFormSchema } from '@utils/validations';

const KEY_FORM = {
  EMAIL: 'email',
  PASSWORD: 'password',
  NAME: 'username',
  PHONE: 'phone',
};

const SignUpWithEmailForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    isSubmitting,
    setSubmitting,
    values,
    handleChange,
    errors,
  } = useFormik({
    initialValues: {
      [KEY_FORM.EMAIL]: '',
      [KEY_FORM.PASSWORD]: '',
      [KEY_FORM.NAME]: '',
      [KEY_FORM.PHONE]: '',
    },
    onSubmit: values => {
      console.log('sign up', values);
      setSubmitting(false);
    },
    validationSchema: AuthFormSchema,
  });
  return (
    <Form onSubmit={handleSubmit}>
      <TextField
        name={KEY_FORM.EMAIL}
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        errorMessage={errors[KEY_FORM.EMAIL as 'email']}
        values={values}
        onChange={handleChange}
      />
      <PasswordField
        name={KEY_FORM.PASSWORD}
        label="Password"
        placeholder="Enter your password"
        errorMessage={errors[KEY_FORM.PASSWORD as 'password']}
        values={values}
        onChange={handleChange}
      />
      <Button
        type="submit"
        typeClass="button--primary"
        isSubmitting={isSubmitting}
      >
        Register
      </Button>
    </Form>
  );
};

export default SignUpWithEmailForm;

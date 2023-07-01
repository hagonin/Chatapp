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
import { useAppDispatch } from '@redux/hook';
import { registerThunk } from '@redux/auth/thunk';

const KEY_FORM = {
  EMAIL: 'email',
  PASSWORD: 'password',
  NAME: 'username',
  PHONE: 'phone_number',
};

const SignUpWithEmailForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    isSubmitting,
    setSubmitting,
    values,
    handleChange,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      [KEY_FORM.EMAIL]: '',
      [KEY_FORM.PASSWORD]: '',
      [KEY_FORM.NAME]: 'Join',
      [KEY_FORM.PHONE]: '',
    },
    onSubmit: values => {
      // console.log('sign up', values);
      dispatch(registerThunk(values));
      setSubmitting(false);
    },
    validationSchema: AuthFormSchema,
  });

  const getError = (field: string) => {
    return (touched[field] && errors[field]) || undefined;
  };
  return (
    <Form onSubmit={handleSubmit}>
      <TextField
        name={KEY_FORM.EMAIL}
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        errorMessage={getError(KEY_FORM.EMAIL)}
        values={values}
        onChange={handleChange}
      />
      <PasswordField
        name={KEY_FORM.PASSWORD}
        label="Password"
        placeholder="Enter your password"
        errorMessage={getError(KEY_FORM.PASSWORD)}
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

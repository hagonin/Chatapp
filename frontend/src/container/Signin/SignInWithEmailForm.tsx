import React from 'react';
import { useFormik } from 'formik';
import { AuthFormSchema } from '@utils/validations';
import { useAppDispatch } from '@redux/hook';
import { loginWithEmailThunk, registerThunk } from '@redux/auth/thunk';
import { Form, PasswordField, TextField } from '@components/Form/Control';
import { Button } from '@components/Common';

const KEY_FORM = {
  EMAIL: 'email',
  PASSWORD: 'password',
  USERNAME: 'username',
};

const SignInWithEmailForm = () => {
  const dispatch = useAppDispatch();
  const { handleChange, handleSubmit, values, errors, isSubmitting, touched } =
    useFormik({
      initialValues: {
        [KEY_FORM.EMAIL]: '',
        [KEY_FORM.PASSWORD]: '',
        [KEY_FORM.USERNAME]: '',
      },
      onSubmit: values => {
        dispatch(loginWithEmailThunk(values));
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
      <Button type="submit" typeClass="button--primary" disabled={isSubmitting}>
        Login
      </Button>
    </Form>
  );
};

export default SignInWithEmailForm;

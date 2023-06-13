import React from 'react';
import { Form, PasswordField, TextField } from '../../components/Form/Control';
import { Button } from '@components/Common';
import { useFormik } from 'formik';
import { AuthFormSchema } from '@utils/validations';

const KEY_FORM = {
  EMAIL: 'email',
  PASSWORD: 'password',
};

const SignInWithEmailForm = () => {
  const { handleChange, handleSubmit, values, errors, isSubmitting } =
    useFormik({
      initialValues: {
        [KEY_FORM.EMAIL]: '',
        [KEY_FORM.PASSWORD]: '',
      },
      onSubmit: values => {
        console.log('sign in email data', values);
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
      <Button type="submit" typeClass="button--primary" disabled={isSubmitting}>
        Login
      </Button>
    </Form>
  );
};

export default SignInWithEmailForm;

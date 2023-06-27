import React from 'react';
import { Form, PasswordError, PasswordField, TextField } from '../Control';
import useForm from '@hooks/useForm';
import {
  emailValidate,
  passwordValidate,
  usernameValidate,
} from '../Control/validate';
import { Button } from '@components/Common';
import { useAuthContext } from '@context/authContext';

const KEY_FORM = {
  EMAIL: 'email',
  PASSWORD: 'password',
};

const SignInWithEmailForm = () => {
  const { handleEmailSignUp, handleLoginWithEmail } = useAuthContext();
  const { values, onChange, onSubmit, errors, isSubmitting } = useForm({
    initValues: {
      [KEY_FORM.EMAIL]: '',
      [KEY_FORM.PASSWORD]: '',
    },
    onCallApi: ({ form, data }) => {
      return handleLoginWithEmail({ form, data }) as Promise<void>;
    },
    validate: {
      [KEY_FORM.EMAIL]: emailValidate,
      [KEY_FORM.PASSWORD]: [
        ...passwordValidate,
        {
          rule: 'password',
          message: <PasswordError />,
        },
      ],
    },
  });
  return (
    <Form onSubmit={onSubmit}>
      <TextField
        name={KEY_FORM.EMAIL}
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        errorMessage={errors[KEY_FORM.EMAIL as 'email']}
        values={values}
        onChange={onChange}
      />
      <PasswordField
        name={KEY_FORM.PASSWORD}
        label="Password"
        placeholder="Enter your password"
        errorMessage={errors[KEY_FORM.PASSWORD as 'password']}
        values={values}
        onChange={onChange}
      />
      <Button type="submit" typeClass="button--primary" disabled={isSubmitting}>
        Login
      </Button>
    </Form>
  );
};

export default SignInWithEmailForm;
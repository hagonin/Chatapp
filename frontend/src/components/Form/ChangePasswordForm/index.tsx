import React from 'react';
import useForm from '@hooks/useForm';
import { UseFormProps } from '@hooks/type';
import Button from '@components/Common/Button';
import { PasswordError } from '@components/Form/Control/ErrorField';
import Form from '@components/Form/Control/Form';
import PasswordField from '@components/Form/Control/PasswordField';
import { passwordValidate } from '@components/Form/Control/validate';

interface Props {
  handleSubmit: UseFormProps['onCallApi'];
}
const ChangePasswordForm: React.FC<Props> = ({ handleSubmit }) => {
  const { onSubmit, values, isSubmitting, errors, onChange } = useForm({
    initValues: {
      reset_password: '',
      reset_confirmPassword: '',
    },
    onCallApi: handleSubmit,
    validate: {
      reset_password: [
        ...passwordValidate,
        {
          rule: 'password',
          message: <PasswordError />,
        },
      ],
      reset_confirmPassword: [
        ...passwordValidate,
        {
          rule: 'match',
          message: 'The password is not match',
          nameFieldMatch: 'reset_password',
        },
      ],
    },
  });
  return (
    <Form onSubmit={onSubmit}>
      <PasswordField
        name="reset_password"
        values={values}
        label="New password"
        placeholder="Enter your new password"
        errorMessage={errors.reset_password}
        onChange={onChange}
      />
      <PasswordField
        name="reset_confirmPassword"
        values={values}
        label="Confirm password"
        placeholder="Re-enter your new password"
        errorMessage={errors.reset_confirmPassword}
        onChange={onChange}
      />
      <Button type="submit" typeClass="button--primary" disabled={isSubmitting}>
        Reset password
      </Button>
    </Form>
  );
};

export default ChangePasswordForm;

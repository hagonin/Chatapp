import React from 'react';
import { useFormik } from 'formik';
import { ConfirmPasswordSchema, EmailSchema } from '@utils/validations';
import Button from '@components/Common/Button';
import Form from '@components/Form/Control/Form';
import PasswordField from '@components/Form/Control/PasswordField';
import { useNavigate } from 'react-router-dom';

const KEY_FORM = {
  PASSWORD: 'password',
  CONFIRM_PASSWORD: 'confirm_password',
};

const ChangePasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    values,
    errors,
    isSubmitting,
    setSubmitting,
    handleChange,
  } = useFormik({
    initialValues: {
      [KEY_FORM.PASSWORD]: '',
      [KEY_FORM.CONFIRM_PASSWORD]: '',
    },
    onSubmit: values => {
      console.log('data before changing password:', values);
      navigate('/chatroom/friend-list');
    },
    validationSchema: ConfirmPasswordSchema,
  });
  return (
    <Form onSubmit={handleSubmit}>
      <PasswordField
        name={KEY_FORM.PASSWORD}
        values={values}
        label="New password"
        placeholder="Enter your new password"
        errorMessage={errors[KEY_FORM.PASSWORD]}
        onChange={handleChange}
      />
      <PasswordField
        name={KEY_FORM.CONFIRM_PASSWORD}
        values={values}
        label="Confirm password"
        placeholder="Re-enter your new password"
        errorMessage={errors[KEY_FORM.CONFIRM_PASSWORD]}
        onChange={handleChange}
      />
      <Button type="submit" typeClass="button--primary" disabled={isSubmitting}>
        Reset password
      </Button>
    </Form>
  );
};

export default ChangePasswordForm;

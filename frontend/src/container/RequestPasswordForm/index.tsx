import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { EmailSchema } from '@utils/validations';
import Button from '@components/Common/Button';
import Form from '@components/Form/Control/Form';
import { TextField } from '@components/Form/Control';

const KEY_FORM = {
  EMAIL: 'email',
};

const RequestPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    values,
    errors,
    isSubmitting,
    setSubmitting,
    handleChange,
    handleBlur,
  } = useFormik({
    initialValues: {
      [KEY_FORM.EMAIL]: '',
    },
    onSubmit: values => {
      console.log('request change password by email data:', values);
      navigate('/change_password');
    },
    validationSchema: EmailSchema,
  });
  return (
    <Form onSubmit={handleSubmit}>
      <TextField
        name={KEY_FORM.EMAIL}
        values={values}
        label="Email Address"
        placeholder="Enter your email"
        type="email"
        errorMessage={errors[KEY_FORM.EMAIL]}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Button type="submit" typeClass="button--primary" disabled={isSubmitting}>
        Reset password
      </Button>
    </Form>
  );
};

export default RequestPasswordForm;

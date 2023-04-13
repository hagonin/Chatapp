import React from 'react';
import { Link } from 'react-router-dom';
import useForm from '@hooks/useForm';
import { imgs } from '@utils/constants';
import Button from '@components/Common/Button';
import { emailValidate } from '@components/Form/Control/validate';
import { Form, TextField } from '@components/Form/Control';

const ResetPassword: React.FC = () => {
  const { onSubmit, values, isSubmitting, errors, onChange, onBlur } = useForm({
    initValues: {
      reset_email: '',
    },
    onCallApi: data => {
      const res = new Promise(resolve => {
        setTimeout(() => {
          resolve(data);
        }, 3000);
      });
      return res.then(res => {
        console.log(res);
      });
    },
    validate: {
      reset_email: emailValidate,
    },
  });
  return (
    <>
      <div className="authenLayout-form login">
        <Form onSubmit={onSubmit}>
          <TextField
            name="reset_email"
            values={values}
            label="Email Address"
            placeholder="Enter your email"
            type="email"
            errorMessage={errors.reset_email}
            onChange={onChange}
            onBlur={onBlur}
          />
          <Button
            type="submit"
            typeClass="button--primary"
            disabled={isSubmitting}
          >
            Reset password
          </Button>
        </Form>
      </div>
      <div>
        <h1 className="authenLayout__title">
          <Link to="/" className="authenLayout__title-logo">
            Talkie
          </Link>
          -Reset Password
        </h1>
        <span className="authenLayout__subtitle">
          No worries, we will send you a link reset new password.
        </span>
        <img
          src={imgs.resetPassword}
          alt="signin"
          className="authenLayout__img"
        />
      </div>
    </>
  );
};

export default ResetPassword;

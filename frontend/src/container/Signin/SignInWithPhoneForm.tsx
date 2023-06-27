import React from 'react';
import { useFormik } from 'formik';
import { Button } from '@components/Common';
import { Form, PasswordField, PhoneField } from '@components/Form/Control';
import { SignInWithPhoneSchema } from '@utils/validations';

const FORM_KEY = {
  PHONE: 'phone_number',
  PASSWORD: 'password',
};

const SignInWithPhoneForm: React.FC = () => {
  const { handleChange, values, errors, isSubmitting, handleSubmit } =
    useFormik({
      initialValues: {
        [FORM_KEY.PHONE]: '',
        [FORM_KEY.PASSWORD]: '',
      },
      onSubmit: values => {
        console.log('sign in phone data', values);
      },
      validationSchema: SignInWithPhoneSchema,
    });

  return (
    <Form onSubmit={handleSubmit}>
      <PhoneField
        name={FORM_KEY.PHONE}
        label="Mobile Phone"
        placeholder="Enter your mobile phone"
        errorMessage={errors[FORM_KEY.PHONE as 'phone_number']}
        values={values}
        onChange={handleChange}
      />
      <PasswordField
        name={FORM_KEY.PASSWORD}
        label="Password"
        placeholder="Enter your password"
        errorMessage={errors[FORM_KEY.PASSWORD as 'password']}
        values={values}
        onChange={handleChange}
      />
      <Button
        type="submit"
        typeClass="button--primary"
        disabled={isSubmitting}
        id="sign-in-button"
      >
        Login
      </Button>
    </Form>
  );
};

export default SignInWithPhoneForm;

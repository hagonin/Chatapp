import React from 'react';
import {
  Form,
  PasswordField,
  PhoneField,
  TextField,
} from '@components/Form/Control';
import { Button } from '@components/Common';
import { useFormik } from 'formik';
import { SignUpWithPhoneSchema } from '@utils/validations';

const FORM_KEY = {
  PHONE: 'phone_number',
  OTP: 'otp',
  PASSWORD: 'password',
};

interface Props {
  type: 'login' | 'signup';
}

type FormTypeProps = 'RequestOTPForm' | 'VerifyOTPForm';

const SignUpWithPhoneForm: React.FC<Props> = ({ type }) => {
  const [formType, setFormType] =
    React.useState<FormTypeProps>('RequestOTPForm');
  const {
    handleSubmit,
    isSubmitting,
    setSubmitting,
    values,
    handleChange,
    errors,
  } = useFormik({
    initialValues: {
      [FORM_KEY.PHONE]: '',
      [FORM_KEY.OTP]: '',
      [FORM_KEY.PASSWORD]: '',
    },
    onSubmit: values => {
      console.log('sign up', values);
      setSubmitting(false);
    },
    validationSchema: SignUpWithPhoneSchema,
  });

  return (
    <Form onSubmit={handleSubmit}>
      <PhoneField
        name={FORM_KEY.PHONE}
        label="Mobile Phone"
        placeholder="Enter your mobile phone"
        errorMessage={errors[FORM_KEY.PHONE]}
        values={values}
        onChange={handleChange}
      />
      {/* <PasswordField
        name={FORM_KEY.PASSWORD}
        label="Password"
        placeholder="Enter your password"
        errorMessage={errors[FORM_KEY.PASSWORD]}
        values={values}
        onChange={handleChange}
      /> */}

      <TextField
        name={FORM_KEY.OTP}
        label="OTP"
        placeholder="Enter your otp"
        errorMessage={errors[FORM_KEY.OTP]}
        values={values}
        onChange={handleChange}
      />
      <div id="recaptcha-container"></div>
      <Button
        type="submit"
        typeClass="button--primary"
        isSubmitting={isSubmitting}
        id="sign-in-button"
      >
        {formType === 'RequestOTPForm'
          ? 'Request OTP'
          : type === 'login'
          ? 'Login'
          : 'SignUp'}
      </Button>
    </Form>
  );
};

export default SignUpWithPhoneForm;

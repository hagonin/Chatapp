import React, { useState } from 'react';
import {
  Form,
  PasswordField,
  PhoneField,
  TextField,
} from '@components/Form/Control';
import { Button } from '@components/Common';
import { useFormik } from 'formik';
import { SignUpWithPhoneSchema } from '@utils/validations';
import { useAppDispatch } from '@redux/hook';
import { comfirmOtpThunk, requestOtpThunk } from '@redux/auth/thunk';

const FORM_KEY = {
  PHONE: 'phone_number',
  OTP: 'otp',
  PASSWORD: 'password',
};

interface Props {
  title: 'Login' | 'Sign Up';
}

type FormTypeProps = 'RequestOTPForm' | 'VerifyOTPForm';

const SignUpWithPhoneForm: React.FC<Props> = ({ title }) => {
  const [isRequestOTP, setIsRequestOTP] = useState(true);
  const dispatch = useAppDispatch();
  const [formType, setFormType] =
    React.useState<FormTypeProps>('RequestOTPForm');
  const {
    handleSubmit,
    isSubmitting,
    setSubmitting,
    values,
    handleChange,
    errors,
    setFieldValue,
    touched,
  } = useFormik({
    initialValues: {
      [FORM_KEY.PHONE]: '',
      [FORM_KEY.OTP]: '',
      [FORM_KEY.PASSWORD]: '',
    },
    onSubmit: values => {
      dispatch(comfirmOtpThunk(values));
      setSubmitting(false);
    },
    validationSchema: SignUpWithPhoneSchema,
  });

  const requestOTP = async () => {
    await dispatch(
      requestOtpThunk({ [FORM_KEY.PHONE]: values[FORM_KEY.PHONE] })
    );
    setIsRequestOTP(false);
  };

  const handleChangeField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFieldValue(name, value);
  };

  const getError = (field: string) => {
    return (touched[field] && errors[field]) || undefined;
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <PhoneField
          name={FORM_KEY.PHONE}
          label="Mobile Phone"
          placeholder="Enter your mobile phone"
          errorMessage={getError(FORM_KEY.PHONE)}
          values={values}
          onChange={handleChangeField}
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
          errorMessage={getError(FORM_KEY.OTP)}
          values={values}
          onChange={handleChangeField}
          disabled={isRequestOTP}
        />

        <div>
          <div id="recaptcha-container"></div>
          {isRequestOTP ? (
            <Button
              type="button"
              typeClass="button--primary"
              id="sign-in-button"
              onClick={requestOTP}
            >
              Request OTP
            </Button>
          ) : null}

          {!isRequestOTP ? (
            <Button
              type="submit"
              typeClass="button--primary"
              isSubmitting={isSubmitting}
              onClick={handleSubmit}
            >
              {title}
            </Button>
          ) : null}
        </div>
      </Form>
    </>
  );
};

export default SignUpWithPhoneForm;

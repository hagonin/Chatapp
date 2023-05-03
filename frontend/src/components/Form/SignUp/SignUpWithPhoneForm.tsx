import React from 'react';
import { Form, PasswordField, PhoneField, TextField } from '../Control';
import { useAuthContext } from '@context/authContext';
import { formatPhone } from '@utils/formatPhone';
import useForm from '@hooks/useForm';
import { Button } from '@components/Common';
import {
  optValidate,
  passwordValidate,
  phoneValidate,
} from '../Control/validate';

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
  const { requestOTP, verifyOTP } = useAuthContext();
  const [formType, setFormType] =
    React.useState<FormTypeProps>('RequestOTPForm');
  const { onChange, values, errors, isSubmitting, onSubmit } = useForm({
    initValues: {
      [FORM_KEY.PHONE]: '',
      [FORM_KEY.OTP]: '',
      [FORM_KEY.PASSWORD]: '',
    },
    onCallApi: async ({ form, data }) => {
      const phoneNumber = formatPhone(data[FORM_KEY.PHONE]);
      form.set(FORM_KEY.PHONE, phoneNumber);
      if (formType === 'RequestOTPForm') {
        setFormType('VerifyOTPForm');
        requestOTP(phoneNumber);
      } else {
        setFormType('RequestOTPForm');
        verifyOTP(data[FORM_KEY.OTP], form);
      }
    },
    validate: {
      [FORM_KEY.PHONE]: phoneValidate,
      [FORM_KEY.OTP]: optValidate,
      [FORM_KEY.PASSWORD]: passwordValidate,
    },
    resetAfterSubmit: false,
  });

  return (
    <Form onSubmit={onSubmit}>
      <PhoneField
        name={FORM_KEY.PHONE}
        label="Mobile Phone"
        placeholder="Enter your mobile phone"
        errorMessage={errors[FORM_KEY.PHONE as 'phone_number']}
        values={values}
        onChange={onChange}
      />
      <PasswordField
        name={FORM_KEY.PASSWORD}
        label="Password"
        placeholder="Enter your password"
        errorMessage={errors[FORM_KEY.PASSWORD as 'password']}
        values={values}
        onChange={onChange}
      />

      {formType === 'VerifyOTPForm' && (
        <TextField
          name={FORM_KEY.OTP}
          label="OTP"
          placeholder="Enter your otp"
          errorMessage={errors[FORM_KEY.OTP as 'otp']}
          values={values}
          onChange={onChange}
        />
      )}
      <div id="recaptcha-container"></div>
      <Button
        type="submit"
        typeClass="button--primary"
        disabled={isSubmitting}
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

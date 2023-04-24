import React from 'react';
import { Form, PhoneField, TextField } from '../Control';
import { useAuthContext } from '@context/authContext';
import { formatPhone } from '@utils/formatPhone';
import useForm from '@hooks/useForm';
import { Button } from '@components/Common';
import { optValidate, phoneValidate } from '../Control/validate';

const FORM_KEY = {
  PHONE: 'phone',
  OTP: 'otp',
};

interface Props {
  type: 'login' | 'signup';
}

type FormTypeProps = 'form1' | 'form2';

const SignUpWithPhoneForm: React.FC<Props> = ({ type }) => {
  const { requestOTP, verifyOTP } = useAuthContext();
  const [formType, setFormType] = React.useState<FormTypeProps>('form1');
  const { onChange, values, errors, isSubmitting, onSubmit } = useForm({
    initValues: {
      [FORM_KEY.PHONE]: '',
      [FORM_KEY.OTP]: '',
    },
    onCallApi: async ({ form, data }) => {
      if (formType === 'form1') {
        setFormType('form2');
        formatPhone(data[FORM_KEY.PHONE]);
        requestOTP(formatPhone(data[FORM_KEY.PHONE]));
      } else {
        setFormType('form1');
        verifyOTP(data[FORM_KEY.OTP]);
      }
    },
    validate: {
      [FORM_KEY.PHONE]: phoneValidate,
      [FORM_KEY.OTP]: optValidate,
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

      {formType === 'form2' && (
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
        {formType === 'form1'
          ? 'Request OTP'
          : type === 'login'
          ? 'Login'
          : 'SignUp'}
      </Button>
    </Form>
  );
};

export default SignUpWithPhoneForm;

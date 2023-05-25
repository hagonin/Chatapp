import React from 'react';
import { Form, PasswordField, PhoneField } from '../Control';
import { useAuthContext } from '@context/authContext';
import { formatPhone } from '@utils/formatPhone';
import useForm from '@hooks/useForm';
import { Button } from '@components/Common';
import { passwordValidate, phoneValidate } from '../Control/validate';

const FORM_KEY = {
  PHONE: 'phone_number',
  PASSWORD: 'password',
};

const SignInWithPhoneForm: React.FC = () => {
  const {} = useAuthContext();
  const { onChange, values, errors, isSubmitting, onSubmit } = useForm({
    initValues: {
      [FORM_KEY.PHONE]: '',
      [FORM_KEY.PASSWORD]: '',
    },
    onCallApi: async ({ form, data }) => {
      const phoneNumber = formatPhone(data[FORM_KEY.PHONE]);
      form.set(FORM_KEY.PHONE, phoneNumber);
    },
    validate: {
      [FORM_KEY.PHONE]: phoneValidate,
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

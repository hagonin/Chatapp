import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './Form.scss';
import { InputProps } from './type';
import ErrorField from './ErrorField';

const PhoneField: React.FC<InputProps> = ({
  name,
  placeholder,
  label,
  errorMessage,
  onChange,
  onBlur,
  values,
}) => {
  return (
    <label htmlFor={name} className="form__label">
      {label}
      <PhoneInput
        containerClass={`form__input ${
          errorMessage ? 'form__input--error' : ''
        }`}
        inputClass="form__input-phone"
        buttonClass="form__input-phone-btn"
        inputProps={{
          name: name,
        }}
        country={'us'}
        value={values[name] as string}
        onChange={(phone, country, e) => onChange?.(e)}
        masks={{ vn: '...-...-...' }}
        countryCodeEditable={false}
      />
      {errorMessage && <ErrorField message={errorMessage} />}
    </label>
  );
};

export default PhoneField;

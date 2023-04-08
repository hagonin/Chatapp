import React from 'react';
import './Form.scss';
import { InputProps } from './type';
import ErrorField from './ErrorField';

const PhoneField: React.FC<InputProps> = ({
  name,
  placeholder,
  label,
  errorMessage,
}) => (
  <label htmlFor={name} className="form__label">
    {label}

    <div className={`form__input ${errorMessage ? 'form__input--error' : ''}`}>
      <span className="form__input-phone-label">+84</span>
      <input
        id={name}
        name={name}
        placeholder={placeholder}
        className="form__input-phone"
        type="number"
        autoComplete="off"
      />
    </div>
    {errorMessage && <ErrorField message={errorMessage} />}
  </label>
);

export default PhoneField;

import React from 'react';
import './Form.scss';
import { InputProps } from './type';
import ErrorField from './ErrorField';

const TextField: React.FC<InputProps> = ({
  name,
  placeholder,
  label,
  errorMessage,
  type,
  onChange,
  onBlur,
  values
}) => (
  <label htmlFor={name} className="form__label">
    {label}
    <input
      id={name}
      name={name}
      placeholder={placeholder}
      className={`form__input ${errorMessage ? 'form__input--error' : ''}`}
      type={type}
      onChange={onChange}
      onBlur={onBlur}
      value={values.name}
    />
    {errorMessage && <ErrorField message={errorMessage} />}
  </label>
);

export default TextField;

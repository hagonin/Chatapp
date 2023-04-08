import React from 'react';
import { imgs } from '@utils/constants';
import { InputProps } from './type';
import './Form.scss';
import ErrorField from './ErrorField';

const PasswordField: React.FC<InputProps> = ({
  name,
  placeholder,
  label,
  errorMessage,
}) => (
  <label htmlFor={name} className="form__label">
    {label}
    <div className={`form__input ${errorMessage ? 'form__input--error' : ''}`}>
      <input id={name} name={name} placeholder={placeholder} type="password" />
      <button className="form__input-icon">
        <img src={imgs.password} alt="password_icon" />
        {/* <img src={imgs.password2} alt="password_icon" /> */}
      </button>
    </div>
    {errorMessage && <ErrorField message={errorMessage} />}
  </label>
);

export default PasswordField;

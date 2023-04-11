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
  onChange,
  onBlur,
  values,
}) => {
  const [showValue, setShowValue] = React.useState(false);
  return (
    <label htmlFor={name} className="form__label">
      {label}
      <div
        className={`form__input ${errorMessage ? 'form__input--error' : ''}`}
      >
        <input
          id={name}
          name={name}
          placeholder={placeholder}
          type={showValue ? 'text' : 'password'}
          onChange={onChange}
          onBlur={onBlur}
          value={values[name]}
        />
        <button
          className="form__input-icon"
          type="button"
          onClick={() => setShowValue(!showValue)}
        >
          {showValue ? (
            <img src={imgs.password} alt="password_icon" />
          ) : (
            <img src={imgs.password2} alt="password_icon" />
          )}
        </button>
      </div>
      {errorMessage && <ErrorField message={errorMessage} />}
    </label>
  );
};

export default PasswordField;

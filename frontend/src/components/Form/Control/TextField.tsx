import React from 'react';
import './Form.scss';
import { icons, imgs } from '@utils/constants';
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
  values,
  typeClass,
}) => {
  return typeClass === 'search' ? (
    <div className="form__search">
      <input
        type="text"
        name={name}
        id={name}
        onChange={onChange}
        placeholder={placeholder}
        value={values[name]}
      />
      <img src={values[name] ? icons.clean : icons.search} alt="search" className='form__search-icon' />
    </div>
  ) : (
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
        value={values[name]}
      />
      {errorMessage && <ErrorField message={errorMessage} />}
    </label>
  );
};

export default TextField;

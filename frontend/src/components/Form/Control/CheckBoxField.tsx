import React from 'react';
import { CheckBoxProps } from './type';
import './Form.scss';

const CheckBoxField: React.FC<CheckBoxProps> = ({ name, option, onChange }) => {
  return (
    <label className="form__input-checkbox">
      <input type="checkbox" name={name} onChange={onChange} checked={true} />
      {option.label}
    </label>
  );
};
export default CheckBoxField;

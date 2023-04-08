import React from 'react';
import './Form.scss';

interface Options {
  id?: number;
  label: string;
}
interface Props {
  name: string;
  options: Options;
}

interface ItemType {
  name: string;
  label: string;
}

const CheckBoxField = ({ name, options }: Props) => {
  return (
    <>
      {Array.isArray(options) ? (
        options.map(option => <ItemCheckBox name={name} label={option.label} />)
      ) : (
        <>
          <ItemCheckBox name={name} label={options.label} />
        </>
      )}
    </>
  );
};
export default CheckBoxField;

const ItemCheckBox = ({ name, label }: ItemType) => {
  console.log(label);

  return (
    <label className="form__input-checkbox">
      <input type="checkbox" name={name} />
      {label}
    </label>
  );
};

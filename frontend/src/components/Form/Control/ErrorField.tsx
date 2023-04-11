import React from 'react';
import './Form.scss';

interface Props {
  message: string;
}
const ErrorField: React.FC<Props> = ({ message }) => (
  <span className="form__error">{message}</span>
);
export default ErrorField;

export const PasswordError = () => (
  <div className="form__validate-list">
    Please provide a valid password
    <ul>
      <li>At least 8 characters long;</li>
      <li>It must have a number;</li>
      <li>It must have a capital alphabet;</li>
      <li>It must have a small alphabet;</li>
      <li>It must have a special character;</li>
    </ul>
  </div>
);

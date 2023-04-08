import React from 'react';
import './Form.scss';

interface Props {
  message: string;
}
const ErrorField = ({ message }: Props) => (
  <span className="form__error">{message}</span>
);
export default ErrorField;

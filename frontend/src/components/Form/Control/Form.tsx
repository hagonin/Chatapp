import React from 'react';
import './Form.scss';

interface Props {
  children?: React.ReactNode;
}

const Form: React.FC<Props> = ({ children }) => (
  <form className="form">{children}</form>
);

export default Form;

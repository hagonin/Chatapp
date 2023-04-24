import React, { FormEvent, FormEventHandler } from 'react';
import './Form.scss';

interface Props {
  children?: React.ReactNode;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const Form: React.FC<Props> = ({ children, onSubmit }) => {
  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      {children}
    </form>
  );
};

export default React.memo(Form);

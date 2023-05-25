import React, { FormEvent, FormEventHandler } from 'react';
import './Form.scss';

interface Props {
  children?: React.ReactNode;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  autoCompleted?: 'on' | 'off';
}

const Form: React.FC<Props> = ({
  children,
  onSubmit,
  autoCompleted = 'on',
}) => {
  return (
    <form
      className="form"
      onSubmit={onSubmit}
      noValidate
      autoComplete={autoCompleted}
    >
      {children}
    </form>
  );
};

export default React.memo(Form);

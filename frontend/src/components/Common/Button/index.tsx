import React from 'react';
import './Button.scss';

interface Props {
  children: React.ReactNode | string;
  type?: 'submit';
  typeClass?: 'button--primary' | 'button--disabled';
  onClick?: () => void;
  disabled?: boolean;
  id?: string;
}

const Button = ({
  children,
  type,
  onClick,
  typeClass,
  disabled,
  id,
}: Props) => {
  return (
    <button
      type={type || 'button'}
      className={`button ${typeClass ? typeClass : ''} ${
        disabled ? 'button--disabled' : ''
      }`}
      onClick={onClick}
      disabled={disabled}
      id={id ? id : ''}
    >
      {disabled ? 'Sending data...' : children}
    </button>
  );
};

export default Button;

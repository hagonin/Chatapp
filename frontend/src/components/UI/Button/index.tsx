import React from 'react';
import './Button.scss';

interface Props {
  children: React.ReactNode | string;
  type?: 'submit';
  typeClass?: 'button--primary' | 'button--disabled';
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({ children, type, onClick, typeClass, disabled }: Props) => {
  return (
    <button
      type={type || 'button'}
      className={`button ${typeClass} ${disabled ? 'button--disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {disabled ? 'Sending data...' : children}
    </button>
  );
};

export default Button;

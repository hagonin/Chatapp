import React from 'react';
import './Button.scss';

interface Props {
  children: React.ReactNode | string;
  type?: 'submit';
  onClick?: () => void;
}

const Button = ({ children, type, onClick }: Props) => {
  return (
    <button
      type={type || 'button'}
      className={`button ${type ? `button--${type}` : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

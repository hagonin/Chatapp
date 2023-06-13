import React from 'react';
import './Button.scss';

interface ButtonProps {
  children: React.ReactNode | string;
  type?: 'submit' | 'button';
  typeClass?: 'button--primary';
  onClick?: () => void;
  disabled?: boolean;
  isSubmitting?: boolean;
  id?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  onClick,
  typeClass,
  disabled,
  isSubmitting,
  id,
}) => {
  return (
    <button
      type={type || 'button'}
      className={`button ${typeClass ? typeClass : ''} ${
        disabled || isSubmitting ? 'button--disabled' : ''
      }`}
      onClick={onClick}
      disabled={disabled || isSubmitting}
      id={id ? id : ''}
    >
      {isSubmitting ? 'Sending data...' : children}
    </button>
  );
};

export default Button;

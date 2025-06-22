'use client';

import React from 'react';
import clsx from 'clsx';

type ButtonProps = {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger' | 'dark' | 'outline';
  disabled?: boolean;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '',
}) => {
  const getVariantClass = (variant: ButtonProps['variant']) => {
    switch (variant) {
      case 'secondary':
        return 'btn-secondary';
      case 'danger':
        return 'btn-danger';
      case 'dark':
        return 'btn-dark';
      case 'outline':
        return 'btn-outline-primary';
      default:
        return 'btn-primary';
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx('btn', getVariantClass(variant), className)}
      disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;

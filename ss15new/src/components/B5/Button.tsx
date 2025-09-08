import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
};

export default function Button({ children, variant = 'primary', ...rest }: Props) {
  const className = `btn ${variant}`;
  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
}
import React from 'react';

type Props = React.TableHTMLAttributes<HTMLTableElement> & {
  children: React.ReactNode;
  head?: React.ReactNode;
};

export default function Table({ head, children, ...rest }: Props) {
  return (
    <table {...rest}>
      {head}
      {children}
    </table>
  );
}
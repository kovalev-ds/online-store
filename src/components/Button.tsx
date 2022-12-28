import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
};

const Button: FC<ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...rest
}) => {
  return (
    <button className="px-7 py-1" {...rest}>
      {children}
    </button>
  );
};

export default Button;

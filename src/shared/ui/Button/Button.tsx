import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
}

export default function Button({
  className,
  children,
  leftSlot,
  rightSlot,
  ...props
}: ButtonProps) {
  return (
    <button className={`${styles.button} ${className} `} type='button' {...props}>
      {leftSlot}
      {children}
      {rightSlot}
    </button>
  );
}

Button.defaultProps = {
  className: '',
  leftSlot: null,
  rightSlot: null,
};

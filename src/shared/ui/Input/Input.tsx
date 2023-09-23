import { InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function Input({ className, ...props }: InputProps) {
  return (
    <div className={`${styles.inputWrapper} ${className}`}>
      <input className={styles.input} {...props} />
    </div>
  );
}

Input.defaultProps = {
  className: '',
};

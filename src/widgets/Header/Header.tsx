import { ReactComponent as MenuIcon } from '@/shared/assets/icons/menu.svg';
import { ReactComponent as BackIcon } from '@/shared/assets/icons/back.svg';
import { HeaderButton } from '@/shared/types/menu';
import { Button } from '@/shared/ui/Button';
import styles from './Header.module.scss';

interface HeaderProps {
  className?: string;
  buttons: HeaderButton[];
}

export default function Header({ className, buttons }: HeaderProps) {
  return (
    <header className={`${styles.header} ${className}`}>
      <MenuIcon />
      <BackIcon />
      {buttons.map(({ title, isActive }) => (
        <Button className={`${styles.button} ${isActive ? styles.button_active : ''}`} key={title}>
          {title}
        </Button>
      ))}
    </header>
  );
}

Header.defaultProps = {
  className: '',
};

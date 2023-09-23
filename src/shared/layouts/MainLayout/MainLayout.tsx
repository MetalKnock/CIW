import { ReactNode } from 'react';
import styles from './MainLayout.module.scss';

interface MainLayoutProps {
  className?: string;
  header?: ReactNode;
  menu?: ReactNode;
  children: ReactNode;
}

export default function MainLayout({ className, header, menu, children }: MainLayoutProps) {
  return (
    <div className={`${styles.mainLayout} ${className}`}>
      <header className={styles.header}>{header}</header>
      <main className={styles.main}>
        {menu}
        {children}
      </main>
    </div>
  );
}

MainLayout.defaultProps = {
  className: '',
  header: null,
  menu: null,
};

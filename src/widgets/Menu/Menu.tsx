import { MenuItem } from '@/shared/types/menu';
import { Button } from '@/shared/ui/Button';
import { ReactComponent as ArrowBottom } from '@/shared/assets/icons/arrow-bottom.svg';
import styles from './Menu.module.scss';

interface MenuProps {
  className?: string;
  menuList: MenuItem[];
  projectName: string;
  abbreviation: string;
}

export default function Menu({ className, menuList, projectName, abbreviation }: MenuProps) {
  return (
    <nav className={`${styles.menu} ${className}`}>
      <div className={styles.project}>
        <div className={styles.projectInfo}>
          <h2 className={styles.title}>{projectName}</h2>
          <h4 className={styles.subtitle}>{abbreviation}</h4>
        </div>
        <Button>
          <ArrowBottom />
        </Button>
      </div>
      <section>
        <ul className={styles.menuList}>
          {menuList.map(({ icon, title, isActive }) => (
            <li key={title} className={styles.menuItem}>
              <Button
                leftSlot={icon}
                className={`${styles.button} ${isActive ? styles.button_active : ''}`}
              >
                <span>{title}</span>
              </Button>
            </li>
          ))}
        </ul>
      </section>
    </nav>
  );
}

Menu.defaultProps = {
  className: '',
};

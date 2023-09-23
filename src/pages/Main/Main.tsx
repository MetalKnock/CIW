import { Table } from '@/widgets/Table';
import styles from './Main.module.scss';

interface MainProps {
  className?: string;
}

export default function Main({ className }: MainProps) {
  return (
    <div className={`${styles.main} ${className}`}>
      <div className={styles.row}>
        <div className={styles.fullNameWrapper}>
          <span>Строительно-монтажные работы</span>
        </div>
      </div>
      <div className={styles.tableWrapper}>
        <Table className={styles.table} />
      </div>
    </div>
  );
}

Main.defaultProps = {
  className: '',
};

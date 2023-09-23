import RowList from '@/widgets/RowList/RowList';
import { useGetListQuery } from '@/entities/row';
import { ReactComponent as Loader } from '@/shared/assets/loader.svg';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { TABLE_TITLES } from '@/shared/constants/form';
import styles from './Table.module.scss';

interface TableProps {
  className?: string;
}

export default function Table({ className }: TableProps) {
  const { id: entityId } = useAppSelector((state) => state.entity);
  const { data: rows = [], isLoading } = useGetListQuery(entityId);

  if (isLoading) {
    return (
      <div className={styles.loaderWrapper}>
        <Loader />
      </div>
    );
  }

  return (
    <table className={`${styles.table} ${className}`}>
      <thead>
        <tr className={styles.headerRow}>
          {TABLE_TITLES.map((title) => (
            <th className={styles.headerCell} key={title}>
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <RowList rows={rows} />
      </tbody>
    </table>
  );
}

Table.defaultProps = {
  className: '',
};

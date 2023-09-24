import { Row } from '../../model/rowTypes';
import styles from './RowView.module.scss';

interface RowViewProps {
  row: Row;
}

export default function RowView({ row }: RowViewProps) {
  const { rowName, salary, equipmentCosts, overheads, estimatedProfit } = row;
  return (
    <>
      <td className={styles.cellWrapper}>
        <div className={styles.cell}>{rowName}</div>
      </td>
      <td className={styles.cellWrapper}>
        <div className={styles.cell}>{salary}</div>
      </td>
      <td className={styles.cellWrapper}>
        <div className={styles.cell}>{equipmentCosts}</div>
      </td>
      <td className={styles.cellWrapper}>
        <div className={styles.cell}>{overheads}</div>
      </td>
      <td className={styles.cellWrapper}>
        <div className={styles.cell}>{estimatedProfit}</div>
      </td>
    </>
  );
}

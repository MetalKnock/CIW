import { ReactNode } from 'react';
import styles from './RowItem.module.scss';

interface RowItemProps {
  className?: string;
  navButtons?: ReactNode;
  children: ReactNode;
  depth: number;
  handleDoubleClick?: () => void;
}

export default function RowItem({
  className,
  navButtons,
  children,
  depth,
  handleDoubleClick,
}: RowItemProps) {
  return (
    <tr className={`${styles.rowItem} ${className}`} onDoubleClick={handleDoubleClick}>
      <td
        className={styles.navButtonsWrapper}
        style={{ paddingLeft: `${(depth * 20 + 10) / 16}rem` }}
      >
        {navButtons}
      </td>
      {children}
    </tr>
  );
}

RowItem.defaultProps = {
  className: '',
  navButtons: null,
  handleDoubleClick: () => {},
};

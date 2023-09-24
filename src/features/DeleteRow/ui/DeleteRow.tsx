import { ReactComponent as DeleteIcon } from '@/shared/assets/icons/remove.svg';
import { Button } from '@/shared/ui/Button';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useDeleteRowMutation } from '../api/deleteRowApi';
import styles from './DeleteRow.module.scss';

interface DeleteRowProps {
  className?: string;
  rowId: number;
}

export default function DeleteRow({ className, rowId }: DeleteRowProps) {
  const { id: entityId } = useAppSelector((state) => state.entity);
  const [deleteRow] = useDeleteRowMutation();

  const handleClick = () => {
    deleteRow({ id: rowId, entityId });
  };

  return (
    <Button
      className={`${styles.DeleteRow} ${className}`}
      onClick={handleClick}
      aria-label='delete row'
    >
      <DeleteIcon />
    </Button>
  );
}

DeleteRow.defaultProps = {
  className: '',
};

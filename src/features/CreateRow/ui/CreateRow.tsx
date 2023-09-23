import { ReactComponent as CreateIcon } from '@/shared/assets/icons/article.svg';
import { Button } from '@/shared/ui/Button';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { rowApi } from '@/entities/row/api/rowApi';
import { INIT_ROW } from '@/shared/constants/row';
import { findRowById } from '@/entities/row/lib/rows';
import { TypeEdited } from '@/shared/types/common';
import styles from './CreateRow.module.scss';

interface CreateRowProps {
  className?: string;
  rowId: number;
  isDisabled: boolean;
  changeEditedRowId: (id: number | null, type: TypeEdited) => void;
}

export default function CreateRow({
  className,
  rowId,
  isDisabled,
  changeEditedRowId,
}: CreateRowProps) {
  const { id: entityId } = useAppSelector((state) => state.entity);

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(
      rowApi.util.updateQueryData('getList', entityId, (rowList) => {
        const foundRow = findRowById(rowList, rowId);

        if (foundRow) {
          changeEditedRowId(INIT_ROW.id, 'create');
          foundRow.child.push(INIT_ROW);
        }
      })
    );
  };

  return (
    <Button
      className={`${styles.CreateRow} ${className}`}
      onClick={handleClick}
      disabled={isDisabled}
    >
      <CreateIcon />
    </Button>
  );
}

CreateRow.defaultProps = {
  className: '',
};

import { Fragment, useEffect, useState } from 'react';
import { EditRow } from '@/features/EditRow/';
import { Row, RowItem, RowView, Rows } from '@/entities/row';
import { CreateRow } from '@/features/CreateRow';
import { DeleteRow } from '@/features/DeleteRow';
import { HEIGHT_VERTICAL_LINE, INIT_ROW } from '@/shared/constants/row';
import { useCreateRowMutation } from '@/features/CreateRow/api/createRowApi';
import { useEditRowMutation } from '@/features/EditRow/api/editRowApi';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { TypeEdited } from '@/shared/types/common';
import { countAncestors } from '@/entities/row/lib/rows';
import styles from './RowList.module.scss';

interface RowListProps {
  rows: Rows;
}

export default function RowList({ rows: rowsData }: RowListProps) {
  const { id: entityId } = useAppSelector((state) => state.entity);
  const [editedRowId, setEditedRowId] = useState<number | null>(null);
  const [typeEdited, setTypeEdited] = useState<TypeEdited>(null);
  const [createRow] = useCreateRowMutation();
  const [editRow] = useEditRowMutation();

  const changeEditedRowId = (id: number | null, type: TypeEdited) => {
    setEditedRowId(id);
    setTypeEdited(type);
  };

  const saveNewRow = async (data: Row & { parentId: number | null }) => {
    switch (typeEdited) {
      case 'create': {
        await createRow({ ...data, entityId });
        break;
      }
      case 'edit': {
        await editRow({ ...data, entityId });
        break;
      }
      default:
        break;
    }
    changeEditedRowId(null, null);
  };

  useEffect(() => {
    if (rowsData.length === 0) {
      changeEditedRowId(0, 'create');
    }
  }, [rowsData.length]);

  if (rowsData.length === 0) {
    return (
      <RowItem
        depth={0}
        navButtons={
          <div className={styles.navButtons}>
            <CreateRow
              className={styles.createButton}
              rowId={INIT_ROW.id}
              changeEditedRowId={changeEditedRowId}
              isDisabled={editedRowId !== null}
            />
          </div>
        }
      >
        <EditRow row={INIT_ROW} updateRow={saveNewRow} parentId={null} />
      </RowItem>
    );
  }

  const renderRows = (rows: Rows, depth: number = 0, parentId: number | null = null) => {
    return rows.map((row) => {
      return (
        <Fragment key={row.id}>
          <RowItem
            depth={depth}
            handleDoubleClick={() => editedRowId === null && changeEditedRowId(row.id, 'edit')}
            navButtons={
              <div className={styles.navButtonsWrapper}>
                <div
                  className={`${styles.verticalLine} ${parentId ? styles.verticalLine_child : ''}`}
                  style={{
                    height: `${HEIGHT_VERTICAL_LINE * countAncestors(rows, row.id) - 8}px`,
                  }}
                />
                <div
                  className={`${styles.navButtons} ${parentId ? styles.navButtons_child : ''} ${
                    row.child.length !== 0 ? styles.navButtons_parent : ''
                  } ${editedRowId === null ? styles.navButtons_enabled : ''}`}
                >
                  <CreateRow
                    className={styles.createButton}
                    rowId={row.id}
                    changeEditedRowId={changeEditedRowId}
                    isDisabled={editedRowId !== null}
                  />
                  <DeleteRow className={styles.deleteButton} rowId={row.id} />
                </div>
              </div>
            }
          >
            {editedRowId !== row.id ? (
              <RowView row={row} />
            ) : (
              <EditRow row={row} updateRow={saveNewRow} parentId={parentId} />
            )}
          </RowItem>
          {row.child && renderRows(row.child, depth + 1, row.id)}
        </Fragment>
      );
    });
  };

  return <>{renderRows(rowsData)}</>;
}

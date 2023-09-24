import { Fragment } from 'react';
import { EditRow } from '@/features/EditRow/';
import { RowItem, RowView, Rows } from '@/entities/row';
import { CreateRow } from '@/features/CreateRow';
import { DeleteRow } from '@/features/DeleteRow';
import { HEIGHT_VERTICAL_LINE, INIT_ROW } from '@/shared/constants/row';

import { countAncestors } from '@/entities/row/lib/rows';
import styles from './RowList.module.scss';
import { useRowList } from './hooks/useRowList';

interface RowListProps {
  rows: Rows;
}

export default function RowList({ rows: rowsData }: RowListProps) {
  const { editedRowId, changeEditedRowId, saveNewRow } = useRowList(rowsData);

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

import { ResponseRow, ResponseRows, Row, Rows } from '@/entities/row';
import { INIT_ROW } from '@/shared/constants/row';

export function findRowById(rows: Rows, id: number): Row | null {
  const stack = [...rows];
  while (stack.length > 0) {
    const currentRow = stack.pop();

    if (currentRow && currentRow.id === id) {
      return currentRow;
    }

    if (currentRow && currentRow.child && currentRow.child.length > 0) {
      stack.push(...currentRow.child);
    }
  }

  return null;
}

export function updateNestedRowsWithUpdateData(existingArray: Rows, updateRowData: ResponseRows) {
  return existingArray.map((row) => {
    const isMatchingRow = updateRowData.find((newRow) => newRow.id === row.id);

    if (!isMatchingRow) {
      return row;
    }

    const updatedRow: Row = {
      ...row,
      ...isMatchingRow,
    };

    if (row.child && row.child.length > 0) {
      updatedRow.child = updateNestedRowsWithUpdateData(row.child, updateRowData);
    }

    return updatedRow;
  });
}

export function updateNestedRowsWithCurrentData(
  existingArray: Rows,
  currentRowData: ResponseRow,
  hasDefaultInit?: boolean
) {
  return existingArray.map((row) => {
    const isMatchingRow = row.id === (hasDefaultInit ? INIT_ROW.id : currentRowData.id);
    const updatedRow: Row = isMatchingRow ? { ...row, ...currentRowData } : { ...row };

    if (!isMatchingRow && row.child && row.child.length > 0) {
      updatedRow.child = updateNestedRowsWithCurrentData(row.child, currentRowData, hasDefaultInit);
    }

    return updatedRow;
  });
}

export function filterNestedRowById(rows: Rows, idToDelete: number): Row[] {
  return rows.reduce((filteredRows: Row[], row: Row) => {
    if (row.id === idToDelete) {
      return filteredRows;
    }

    const filteredChild = row.child ? filterNestedRowById(row.child, idToDelete) : [];
    const newRow: Row = { ...row, child: filteredChild };

    return [...filteredRows, newRow];
  }, []);
}

export function countAncestors(rows: Rows, targetId: number) {
  let count = 1;
  function recursiveCountAncestors(items: Rows) {
    for (let i = 0; i < items.length; i += 1) {
      if (items[i].id === targetId) {
        return;
      }
      count += 1;
      if (items[i].child.length > 0) {
        recursiveCountAncestors(items[i].child);
      }
    }
  }
  recursiveCountAncestors(rows);
  return count;
}

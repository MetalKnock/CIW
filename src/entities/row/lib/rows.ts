import { Row, Rows } from '@/entities/row';

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

export function removeRowById(rows: Rows, id: number) {
  let found = false;
  rows.forEach((row, index) => {
    if (row.id === id) {
      rows.splice(index, 1);
      found = true;
    }

    if (row.child && row.child.length > 0) {
      if (removeRowById(row.child, id)) {
        found = true;
      }
    }
  });
  return found;
}

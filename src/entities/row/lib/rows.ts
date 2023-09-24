import { ResponseRow, ResponseRows, Row, Rows } from '@/entities/row';

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

export function updateNestedArray(
  existingArray: Rows,
  updateData: ResponseRows,
  currentData?: ResponseRow,
  hasZero?: boolean
) {
  return existingArray.map((item) => {
    const matchingItem = updateData.find((newItem) => newItem.id === item.id);

    if (hasZero && currentData && item.id === 0) {
      return { ...currentData, child: [] };
    }

    if (!matchingItem) {
      return item;
    }

    const updatedItem: Row = {
      ...item,
      ...matchingItem,
    };

    if (item.child && item.child.length > 0) {
      updatedItem.child = updateNestedArray(item.child, updateData, currentData, hasZero);
    }

    return updatedItem;
  });
}

export function filterNestedArray(existingArray: Rows, idForFiltering: number) {
  return existingArray.filter((item) => {
    if (item.child && item.child.length > 0) {
      item.child = filterNestedArray(item.child, idForFiltering);
    }

    return item.id !== idForFiltering;
  });
}

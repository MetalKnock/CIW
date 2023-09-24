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

export function updateNestedArray(
  existingArray: Rows,
  updateData: ResponseRows,
  currentData?: ResponseRow,
  hasDefaultInit?: boolean
) {
  return existingArray.map((item) => {
    const matchingItem = updateData.find((newItem) => newItem.id === item.id);

    if (hasDefaultInit && currentData && item.id === INIT_ROW.id) {
      return { ...currentData, child: [] };
    }

    if (!hasDefaultInit && currentData && item.id === currentData.id) {
      return { ...currentData, child: [...item.child] };
    }

    if (!matchingItem) {
      return item;
    }

    const updatedItem: Row = {
      ...item,
      ...matchingItem,
    };

    if (item.child && item.child.length > 0) {
      updatedItem.child = updateNestedArray(item.child, updateData, currentData, hasDefaultInit);
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

import { useEffect, useState } from 'react';
import { useCreateRowMutation } from '@/features/CreateRow/api/createRowApi';
import { useEditRowMutation } from '@/features/EditRow/api/editRowApi';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { TypeEdited } from '@/shared/types/common';
import { Rows, Row } from '@/entities/row';

export function useRowList(rowsData: Rows) {
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
      case 'create':
        await createRow({ ...data, entityId });
        break;
      case 'edit':
        await editRow({ ...data, entityId });
        break;
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

  return {
    editedRowId,
    typeEdited,
    changeEditedRowId,
    saveNewRow,
  };
}

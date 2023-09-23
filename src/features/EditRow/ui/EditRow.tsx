import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { Row } from '@/entities/row/model/rowTypes';
import { INPUT_FIELDS } from '../model/constants';
import { Input } from '@/shared/ui/Input';
import styles from './EditRow.module.scss';

interface EditRowProps {
  row: Row;
  updateRow: (data: Row & { parentId: number | null }) => Promise<void>;
  parentId: number | null;
}

export default function EditRow({ row, updateRow, parentId }: EditRowProps) {
  const [rowData, setRowData] = useState<Row>(row);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, type: 'number' | 'text') => {
    const { name, value } = e.target;
    setRowData((prevData) => ({
      ...prevData,
      [name]: type === 'number' ? value.replace(/\D/g, '') || 0 : value,
    }));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      updateRow({ ...rowData, parentId });
    }
  };

  return (
    <>
      {INPUT_FIELDS.map(({ name, type }) => (
        <td key={name}>
          <div className={styles.cell}>
            <Input
              name={name}
              value={rowData[name]}
              onChange={(e) => handleInputChange(e, type)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </td>
      ))}
    </>
  );
}

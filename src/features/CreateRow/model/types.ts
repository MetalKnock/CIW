import { Row, ResponseRow, ResponseRows } from '@/entities/row';

export type ResponseCreateRow = {
  current: ResponseRow;
  changed: ResponseRows;
};
export type RequestCreateRow = Omit<Row, 'id'> & { parentId: number | null; entityId: number };

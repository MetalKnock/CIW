import { Row, Rows } from '@/entities/row';

export type ResponseCreateRow = {
  current: Omit<Row, 'child'>;
  changed: Rows;
};
export type RequestCreateRow = Omit<Row, 'id'> & { parentId: number | null; entityId: number };

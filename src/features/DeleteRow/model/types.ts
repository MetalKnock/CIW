import { Row, Rows } from '@/entities/row';

export type ResponseDeleteRow = {
  current: Row | null;
  changed: Rows;
};
export type RequestDeleteRow = Pick<Row, 'id'> & { entityId: number };

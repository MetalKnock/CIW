import { ResponseRows, Row } from '@/entities/row';

export type ResponseDeleteRow = {
  current: null;
  changed: ResponseRows;
};
export type RequestDeleteRow = Pick<Row, 'id'> & { entityId: number };

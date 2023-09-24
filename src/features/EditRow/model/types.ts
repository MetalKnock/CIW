import { Row, Rows } from '@/entities/row/model/rowTypes';

type RowWithoutChildren = Omit<Row, 'child'>;

export type InputField = {
  name: keyof RowWithoutChildren;
  type: 'text' | 'number';
};

export type ResponseEditRow = {
  current: Row;
  changed: Rows;
};

export type RequestEditRow = Pick<Row, 'id'> & { entityId: number };

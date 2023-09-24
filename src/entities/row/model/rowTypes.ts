export interface Row {
  id: number;
  rowName: string;
  total: number;
  salary: number;
  mimExploitation: number;
  machineOperatorSalary: number;
  materials: number;
  mainCosts: number;
  supportCosts: number;
  equipmentCosts: number;
  overheads: number;
  estimatedProfit: number;
  child: Row[];
}

export type Rows = Row[];

export type ResponseRow = Omit<Row, 'child'>;

export type ResponseRows = ResponseRow[];

import {IData} from '../../interfaces/interfaces';

export type Order = EOrder.ASC | EOrder.DESC;

export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IData) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export enum EOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof IData;
  label: string;
  numeric: boolean;
}

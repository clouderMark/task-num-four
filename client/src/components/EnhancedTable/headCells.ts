import {HeadCell} from './types';

export const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: "User's names",
  },
  {
    id: 'createdAt',
    numeric: true,
    disablePadding: false,
    label: 'Created at',
  },
  {
    id: 'lastVisit',
    numeric: true,
    disablePadding: false,
    label: 'Updatet at',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
  },
];

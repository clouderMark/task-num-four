import {Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel} from '@mui/material';
import {visuallyHidden} from '@mui/utils';
import {IData} from '../../interfaces/interfaces';
import {EnhancedTableProps} from './types';

interface HeadCell {
  disablePadding: boolean;
  id: keyof IData;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
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

function EnhancedTableHead(props: EnhancedTableProps) {
  const {onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props;
  const createSortHandler = (property: keyof IData) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead;
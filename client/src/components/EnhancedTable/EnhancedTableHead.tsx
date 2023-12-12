import {useSelector} from 'react-redux';
import {Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel} from '@mui/material';
import {visuallyHidden} from '@mui/utils';
import {IData} from '../../interfaces/interfaces';
import {selectTable, setOrder, setOrderBy, setSelected, setSelectedStatus} from '../../redux/tableSlice';
import {useAppDispatch} from '../../redux/hooks';
import {EOrder} from './types';

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

function EnhancedTableHead() {
  const dispatch = useAppDispatch();
  const {rows, order, orderBy, selected, statuses, allId} = useSelector(selectTable);
  const numSelected = selected.length;
  const statusSelected = statuses.length;
  const rowCount = rows.length;

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      dispatch(setSelected(allId));
      dispatch(setSelectedStatus([]));

      return;
    }

    dispatch(setSelected([]));
  };

  const handleSelectAllStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      dispatch(setSelectedStatus(allId));
      dispatch(setSelected([]));

      return;
    }

    dispatch(setSelectedStatus([]));
  };

  const handleRequestSort = (property: keyof IData) => () => {
    const isAsc = orderBy === property && order === EOrder.ASC;

    dispatch(setOrder(isAsc ? EOrder.DESC : EOrder.ASC));
    dispatch(setOrderBy(property));
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={handleSelectAllClick}
            inputProps={{
              'aria-label': 'select all users',
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
              direction={orderBy === headCell.id ? order : EOrder.ASC}
              onClick={handleRequestSort(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === EOrder.DESC ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={statusSelected > 0 && statusSelected < rowCount}
            checked={rowCount > 0 && statusSelected === rowCount}
            onChange={handleSelectAllStatus}
            inputProps={{
              'aria-label': "select all user's status",
            }}
          />
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead;

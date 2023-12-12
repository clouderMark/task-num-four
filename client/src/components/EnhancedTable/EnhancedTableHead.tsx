import {useSelector} from 'react-redux';
import {ActionCreatorWithPayload} from '@reduxjs/toolkit';
import {Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel} from '@mui/material';
import {visuallyHidden} from '@mui/utils';
import {IData} from '../../interfaces/interfaces';
import {selectTable, setOrder, setOrderBy, setSelected, setSelectedStatus} from '../../redux/tableSlice';
import {useAppDispatch} from '../../redux/hooks';
import {EOrder} from './types';
import {headCells} from './headCells';

function EnhancedTableHead() {
  const dispatch = useAppDispatch();
  const {rows, order, orderBy, selected, statuses, allId} = useSelector(selectTable);
  const numSelected = selected.length;
  const statusSelected = statuses.length;
  const rowCount = rows.length;

  const handleSelectAllClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    action: ActionCreatorWithPayload<string[]>,
    reset: ActionCreatorWithPayload<string[]>,
  ) => {
    if (event.target.checked) {
      dispatch(action(allId));
      dispatch(reset([]));

      return;
    }

    dispatch(action([]));
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
            onChange={(e) => handleSelectAllClick(e, setSelected, setSelectedStatus)}
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
            onChange={(e) => handleSelectAllClick(e, setSelectedStatus, setSelected)}
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

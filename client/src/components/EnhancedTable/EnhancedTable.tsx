import * as React from 'react';
import {ActionCreatorWithPayload} from '@reduxjs/toolkit';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
} from '@mui/material/';
import {shallowEqual, useSelector} from 'react-redux';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import {
  selectSortRows,
  selectTable,
  setPage,
  setRowsPerPage,
  setSelected,
  setSelectedStatus,
} from '../../redux/tableSlice';
import {useAppDispatch} from '../../redux/hooks';
import {isSelected} from './isSelected';

function EnhancedTable() {
  const dispatch = useAppDispatch();
  const {selected, page, rowsPerPage, statuses} = useSelector(selectTable);
  const rows = useSelector(selectSortRows, shallowEqual);

  const handleClick = (id: string, state: string[], action: ActionCreatorWithPayload<string[]>) => {
    const selectedIndex = state.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = [...state, id];
    } else if (selectedIndex === 0) {
      newSelected = [...state.slice(1)];
    } else if (selectedIndex === state.length - 1) {
      newSelected = state.slice(0, -1);
    } else if (selectedIndex > 0) {
      newSelected = [...state.slice(0, selectedIndex), ...state.slice(selectedIndex + 1)];
    }

    dispatch(action(newSelected));
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(setPage(newPage));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setRowsPerPage(+event.target.value));
    dispatch(setPage(0));
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{width: '100%'}}>
      <Paper sx={{width: '100%', mb: 2}}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table sx={{minWidth: 750}} aria-labelledby="tableTitle" size="medium">
            <EnhancedTableHead />
            <TableBody>
              {rows.map((row, index) => {
                const isItemSelected = isSelected(row.id, selected);
                const isStatusSelected = isSelected(row.id, statuses);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{cursor: 'pointer'}}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        onClick={() => handleClick(row.id, selected, setSelected)}
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.createdAt.toLocaleString('en-US', {hour12: false})}</TableCell>
                    <TableCell align="right">{row.lastVisit.toLocaleString('en-US', {hour12: false})}</TableCell>
                    <TableCell align="right">{row.status ? 'blocked' : 'active'}</TableCell>
                    <TableCell padding="checkbox">
                      <Checkbox
                        onClick={() => handleClick(row.id, statuses, setSelectedStatus)}
                        color="primary"
                        checked={isStatusSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={4} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{div: {flexDirection: 'row'}}}
        />
      </Paper>
    </Box>
  );
}

export default EnhancedTable;

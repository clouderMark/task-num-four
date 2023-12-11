import * as React from 'react';
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
import {IData} from '../../interfaces/interfaces';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import {
  selectRows,
  selectTable,
  setOrder,
  setOrderBy,
  setPage,
  setRowsPerPage,
  setSelected,
} from '../../redux/tableSlice';
import {useAppDispatch} from '../../redux/hooks';

function EnhancedTable() {
  const dispatch = useAppDispatch();
  const {selected, order, orderBy, page, rowsPerPage} = useSelector(selectTable);
  const rows = useSelector(selectRows, shallowEqual);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof IData) => {
    const isAsc = orderBy === property && order === 'asc';

    dispatch(setOrder(isAsc ? 'desc' : 'asc'));
    dispatch(setOrderBy(property));
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);

      dispatch(setSelected(newSelected));

      return;
    }

    dispatch(setSelected([]));
  };

  const handleClick = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else if (selectedIndex === 0) {
      newSelected = [...selected.slice(1)];
    } else if (selectedIndex === selected.length - 1) {
      newSelected = selected.slice(0, -1);
    } else if (selectedIndex > 0) {
      newSelected = [...selected.slice(0, selectedIndex), ...selected.slice(selectedIndex + 1)];
    }

    dispatch(setSelected(newSelected));
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(setPage(newPage));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setRowsPerPage(+event.target.value));
    dispatch(setPage(0));
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{width: '100%'}}>
      <Paper sx={{width: '100%', mb: 2}}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table sx={{minWidth: 750}} aria-labelledby="tableTitle" size="medium">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={() => handleClick(row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{cursor: 'pointer'}}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
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
                    <TableCell align="right">{row.createdAt.toDateString()}</TableCell>
                    <TableCell align="right">{row.lastVisit.toDateString()}</TableCell>
                    <TableCell align="right">{row.status ? 'blocked' : 'active'}</TableCell>
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

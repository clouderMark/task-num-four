import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
} from '@mui/material';

interface IProps {
  tableHeadCells?: JSX.Element;
  tableBodyCells: JSX.Element;
}

export const Board = (props: IProps) => (
  <TableContainer component={Paper} sx={{mt: 2, mb: 2}}>
    <Table size="small">
      {props.tableHeadCells ? (
        <TableHead>
          <TableRow>
            {props.tableHeadCells}
          </TableRow>
        </TableHead>
      ) : null}
      {props.tableBodyCells ? (
        <TableBody>
          {props.tableBodyCells}
        </TableBody>
      ) : null}
    </Table>
  </TableContainer>
);

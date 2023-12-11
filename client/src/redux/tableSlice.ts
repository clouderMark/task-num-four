import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import type {RootState} from './store';
import {IData} from '../interfaces/interfaces';
import {Order} from '../components/EnhancedTable/types';
import {getComparator} from '../components/EnhancedTable/getComparator';

interface IInitialState {
  rows: IData[];
  selected: string[];
  order: Order;
  orderBy: keyof IData;
  page: number;
  rowsPerPage: number;
  isDelete: boolean;
}

const initialState: IInitialState = {
  rows: [],
  selected: [],
  order: 'asc',
  orderBy: 'name',
  page: 0,
  rowsPerPage: 5,
  isDelete: false,
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setRows: (state, action: PayloadAction<IData[]>) => {
      state.rows = action.payload;
    },
    setSelected: (state, action: PayloadAction<string[]>) => {
      state.selected = action.payload;
    },
    setOrder: (state, action: PayloadAction<Order>) => {
      state.order = action.payload;
    },
    setOrderBy: (state, action: PayloadAction<keyof IData>) => {
      state.orderBy = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload;
    },
    setDeleteItems: (state, action: PayloadAction<boolean>) => {
      state.isDelete = action.payload;
    },
  },
});

export const selectTable = (state: RootState) => state.table;
export const {setRows, setSelected, setOrder, setOrderBy, setPage, setRowsPerPage, setDeleteItems} = tableSlice.actions;
export const selectRows = (state: RootState) =>
  [...state.table.rows]
    .sort(getComparator(state.table.order, state.table.orderBy))
    .slice(
      state.table.page * state.table.rowsPerPage,
      state.table.page * state.table.rowsPerPage + state.table.rowsPerPage,
    );

import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import type {RootState} from './store';
import {IData} from '../interfaces/interfaces';
import {EOrder, Order} from '../components/EnhancedTable/types';
import {getComparator} from '../components/EnhancedTable/getComparator';

interface IInitialState {
  rows: IData[];
  selected: string[];
  order: Order;
  orderBy: keyof IData;
  page: number;
  rowsPerPage: number;
  isDelete: boolean;
  statuses: string[];
  allId: string[];
  isChange: boolean;
}

const initialState: IInitialState = {
  rows: [],
  selected: [],
  order: EOrder.ASC,
  orderBy: 'name',
  page: 0,
  rowsPerPage: 5,
  isDelete: false,
  statuses: [],
  isChange: false,
  allId: [],
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setRows: (state, action: PayloadAction<IData[]>) => {
      state.rows = action.payload;
      state.allId = action.payload.map((n) => n.id);
    },
    setSelected: (state, action: PayloadAction<string[]>) => {
      state.selected = action.payload;
      state.statuses = [];
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
    setSelectedStatus: (state, action: PayloadAction<string[]>) => {
      state.statuses = action.payload;
      state.selected = [];
    },
    setChangeStatus: (state, action: PayloadAction<boolean>) => {
      state.isChange = action.payload;
    },
  },
});

export const selectTable = (state: RootState) => state.table;
export const {
  setRows,
  setSelected,
  setOrder,
  setOrderBy,
  setPage,
  setRowsPerPage,
  setDeleteItems,
  setSelectedStatus,
  setChangeStatus,
} = tableSlice.actions;
export const selectSortRows = (state: RootState) =>
  [...state.table.rows]
    .sort(getComparator(state.table.order, state.table.orderBy))
    .slice(
      state.table.page * state.table.rowsPerPage,
      state.table.page * state.table.rowsPerPage + state.table.rowsPerPage,
    );

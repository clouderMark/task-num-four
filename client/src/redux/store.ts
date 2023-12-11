import {configureStore} from '@reduxjs/toolkit';
import {userApi} from './userApi';
import {userSlice} from './userSlice';
import {alertSlice} from './alertSlice';
import {loaderSlice} from './loaderSlice';
import {tableSlice} from './tableSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    alert: alertSlice.reducer,
    loader: loaderSlice.reducer,
    table: tableSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

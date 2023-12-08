import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import type {RootState} from './store';
import {userApi} from './userApi';

interface IInitialState {
  id: number | null;
  email: string | null;
  isAuth: boolean;
  token: null | string;
}

interface IRegistration {
  email: string;
  id: number;
}

const initialState: IInitialState = {
  id: null,
  email: null,
  isAuth: false,
  token: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{token: string}>) => {
      const {token} = action.payload;

      const user = jwtDecode(token) as IRegistration;

      localStorage.setItem('token', token);

      state.id = user.id;
      state.email = user.email;
      state.isAuth = true;
      state.token = token;
    },
    logout: () => {
      localStorage.removeItem('token');

      return initialState;
    },
    getToken: (state) => {
      const token = localStorage.getItem('token');

      state.token = token;
    },
  },

  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.checkUser.matchFulfilled, (state, {payload}) => {
        const {token} = payload;

        const user = jwtDecode(token) as IRegistration;

        localStorage.setItem('token', token);

        state.id = user.id;
        state.email = user.email;
        state.isAuth = true;
        state.token = token;
      })
      .addMatcher(userApi.endpoints.checkUser.matchRejected, () => {
        localStorage.removeItem('token');

        return initialState;
      })
      .addMatcher(userApi.endpoints.loginUser.matchFulfilled, (state, {payload}) => {
        const {token} = payload;

        const user = jwtDecode(token) as IRegistration;

        localStorage.setItem('token', token);

        state.id = user.id;
        state.email = user.email;
        state.isAuth = true;
        state.token = token;
      })
      .addMatcher(userApi.endpoints.signupUser.matchFulfilled, (state, {payload}) => {
        const {token} = payload;

        const user = jwtDecode(token) as IRegistration;

        localStorage.setItem('token', token);

        state.id = user.id;
        state.email = user.email;
        state.isAuth = true;
        state.token = token;
      });
  },
});

export const selectUser = (state: RootState) => state.user;
export const {login, logout, getToken} = userSlice.actions;

import {createApi, fetchBaseQuery, BaseQueryFn, FetchArgs} from '@reduxjs/toolkit/query/react';
import {ICustomError, ILogin, IUser} from '../interfaces/interfaces';

const BASE_URL = process.env.REACT_APP_API_URL;

interface IIds {
  id: string[];
}

interface IToken {
  token: string;
}

interface ISignup extends ILogin {
  name: string,
}

interface IUpdate extends ILogin, IToken {}

interface IAct extends IToken, IIds {}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}user`,
    credentials: 'include',
  }) as BaseQueryFn<string | FetchArgs, unknown, ICustomError, {}>,
  endpoints: (builder) => ({
    signupUser: builder.mutation<IToken, ISignup>({
      query: (data) => ({
        url: '/signup',
        method: 'POST',
        body: {...data},
      }),
    }),
    loginUser: builder.mutation<IToken, ILogin>({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: {...data},
      }),
    }),
    checkUser: builder.mutation<IToken, string>({
      query: (token) => ({
        url: '/check',
        method: 'GET',
        headers: {authorization: `Bearer ${token}`},
      }),
    }),
    getAllUsers: builder.query<IUser[], string>({
      query: (token) => ({
        url: '/getall',
        method: 'GET',
        headers: {authorization: `Bearer ${token}`},
      }),
    }),
    updateUser: builder.mutation<IUser, IUpdate>({
      query: (data) => ({
        url: `/update/:${data.id}`,
        method: 'PUT',
        headers: {authorization: `Bearer ${data.token}`},
      }),
    }),
    deleteUsers: builder.mutation<IUser[], IAct>({
      query: (data) => ({
        url: '/delete',
        method: 'DELETE',
        headers: {authorization: `Bearer ${data.token}`},
        body: {id: data.id},
      }),
    }),
    changeUsersStatus: builder.mutation<IUser[], IAct>({
      query: (data) => ({
        url: '/status',
        method: 'PUT',
        headers: {authorization: `Bearer ${data.token}`},
        body: {id: data.id},
      }),
    }),
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useCheckUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUsersMutation,
  useChangeUsersStatusMutation,
} = userApi;

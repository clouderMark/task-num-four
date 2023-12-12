import {createApi, fetchBaseQuery, BaseQueryFn, FetchArgs} from '@reduxjs/toolkit/query/react';
import {IAct, ICustomError, IData, IDelete, ILogin, ISignup, IToken, IUser} from '../interfaces/interfaces';

const BASE_URL = process.env.REACT_APP_API_URL;

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
    getAllUsers: builder.mutation<IData[], {token: string}>({
      query: (data) => ({
        url: '/getall',
        method: 'GET',
        headers: {authorization: `Bearer ${data.token}`},
      }),
      transformResponse: (response: IUser[]): IData[] =>
        response.map((el) => ({
          name: el.name,
          createdAt: new Date(el.createdAt),
          lastVisit: new Date(el.lastVisit.date),
          status: el.status.blocked,
          id: el._id!,
        })),
    }),
    deleteUsers: builder.mutation<IDelete, IAct>({
      query: (data) => ({
        url: '/delete',
        method: 'DELETE',
        headers: {authorization: `Bearer ${data.token}`},
        body: {id: data.id},
      }),
    }),
    changeUsersStatus: builder.mutation<{_id: string}[], IAct>({
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
  useGetAllUsersMutation,
  useDeleteUsersMutation,
  useChangeUsersStatusMutation,
} = userApi;

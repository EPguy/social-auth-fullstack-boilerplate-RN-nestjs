import { createApi } from '@reduxjs/toolkit/query/react';
import { AxiosBaseQuery } from '../axiosBaseQuery';
import { UpdateNicknameRequest } from '../../models/user/UpdateNicknameRequest';
import { User } from '../../models/user/User';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: AxiosBaseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUserInfo: builder.query<User, void>({
      query: () => {
        return {
          url: 'user',
          method: 'GET',
        };
      },
      providesTags: () => [{ type: 'User' }],
    }),
    updateNickname: builder.mutation<User, UpdateNicknameRequest>({
      query: (data) => {
        return {
          url: 'user/nickname',
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: () => [{ type: 'User' }],
    }),
  }),
});
export const { useGetUserInfoQuery, useUpdateNicknameMutation } = userApi;

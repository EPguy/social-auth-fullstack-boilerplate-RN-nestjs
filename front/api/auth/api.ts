import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../axiosBaseQuery';
import { SignInResponse } from '../../models/auth/SignInResponse';
import { SignInLocalRequest } from '../../models/auth/SignInLocalRequest';
import { SignInSocialRequest } from '../../models/auth/SignInSocialRequest';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    localSignIn: builder.mutation<SignInResponse, SignInLocalRequest>({
      query: (data) => {
        return {
          url: 'auth/signin',
          method: 'POST',
          body: data,
        };
      },
    }),
    socialSignIn: builder.mutation<SignInResponse, SignInSocialRequest>({
      query: (data) => {
        return {
          url: 'auth/signin/social',
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
});
export const { useLocalSignInMutation, useSocialSignInMutation } = authApi;

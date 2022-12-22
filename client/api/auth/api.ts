import { createApi } from '@reduxjs/toolkit/query/react';
import { AxiosBaseQuery } from '../axiosBaseQuery';
import { SignInResponse } from '../../models/auth/SignInResponse';
import { SignInLocalRequest } from '../../models/auth/SignInLocalRequest';
import { SignInSocialRequest } from '../../models/auth/SignInSocialRequest';
import { SignUpLocalRequest } from '../../models/auth/SignUpLocalRequest';
import { SignUpResponse } from '../../models/auth/SignUpResponse';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: AxiosBaseQuery,
  endpoints: (builder) => ({
    localSignUp: builder.mutation<SignUpResponse, SignUpLocalRequest>({
      query: (data) => {
        return {
          url: 'auth/signup',
          method: 'POST',
          body: data,
        };
      },
    }),
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
    logout: builder.mutation<boolean, void>({
      query: () => {
        return {
          url: 'auth/logout',
          method: 'GET',
        };
      },
    }),
  }),
});
export const {
  useLocalSignUpMutation,
  useLocalSignInMutation,
  useSocialSignInMutation,
  useLogoutMutation,
} = authApi;

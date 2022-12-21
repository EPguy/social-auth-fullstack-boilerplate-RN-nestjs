import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { Properties } from '../Properties';
import { Mutex } from 'async-mutex';
import Toast from 'react-native-toast-message';
import { setAccessToken } from '../store/slices/authSlice';
import { RefershTokenResponse } from '../models/auth/RefershTokenResponse';

const baseUrl = Properties.API_URL;

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).auth.accessToken;
    console.log(token);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const AxiosBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  console.log(result);
  if (result.error?.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          { url: 'auth/refresh' },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          api.dispatch(
            setAccessToken({
              accessToken: (refreshResult.data as RefershTokenResponse)
                .accessToken,
            }),
          );
          result = await baseQuery(args, api, extraOptions);
        } else {
          // refresh token 만료되었을 경우
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  } else if (result.error) {
    Toast.show({
      type: 'error',
      text1: (result.error.data as any).message,
    });
  }
  return result;
};

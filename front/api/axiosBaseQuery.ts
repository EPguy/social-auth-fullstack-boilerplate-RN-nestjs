import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { Properties } from '../Properties';
import { Mutex } from 'async-mutex';

const baseUrl = Properties.API_URL;

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).auth.accessToken;
    if (token) {
      headers.set('authorization', `Barer ${token}`);
    }
    return headers;
  },
});

export const axiosBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
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
    console.log((result.error?.data as any).message);
  }

  return result;
};

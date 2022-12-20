import {
  useLocalSignInMutation,
  useSocialSignInMutation,
} from '../api/auth/api';
import { useCallback } from 'react';
import { SignInLocalRequest } from '../models/auth/SignInLocalRequest';
import { SignInSocialRequest } from '../models/auth/SignInSocialRequest';
import { useAppDispatch } from '../store/config';
import { setAccessToken } from '../store/slices/authSlice';

export default function useAuth() {
  const dispatch = useAppDispatch();
  const [localSignInMutation] = useLocalSignInMutation();
  const [socialSignInMutation] = useSocialSignInMutation();

  const localSignIn = useCallback(
    async (signInLocalRequest: SignInLocalRequest) => {
      const accessToken = await localSignInMutation(
        signInLocalRequest,
      ).unwrap();
      if (accessToken) {
        dispatch(setAccessToken(accessToken));
      }
    },
    [dispatch, localSignInMutation],
  );

  const socialSignIn = useCallback(
    async (signinSocialRequestDto: SignInSocialRequest) => {
      const accessToken = await socialSignInMutation(
        signinSocialRequestDto,
      ).unwrap();
      if (accessToken) {
        dispatch(setAccessToken(accessToken));
        return true;
      }
      return false;
    },
    [dispatch, socialSignInMutation],
  );

  return { localSignIn, socialSignIn };
}

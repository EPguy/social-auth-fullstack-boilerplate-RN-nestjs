import {
  useLocalSignInMutation,
  useLocalSignUpMutation,
  useLogoutMutation,
  useSocialSignInMutation,
} from '../api/auth/api';
import { useCallback } from 'react';
import { SignInLocalRequest } from '../models/auth/SignInLocalRequest';
import { SignInSocialRequest } from '../models/auth/SignInSocialRequest';
import { useAppDispatch } from '../store/config';
import { setAccessToken, setLoginType } from '../store/slices/authSlice';
import { SignUpLocalRequest } from '../models/auth/SignUpLocalRequest';
import Toast from 'react-native-toast-message';
import { AuthTypeEnum } from '../enum/AuthTypeEnum';

export default function useAuth() {
  const dispatch = useAppDispatch();
  const [localSignUpMutation] = useLocalSignUpMutation();
  const [localSignInMutation] = useLocalSignInMutation();
  const [socialSignInMutation] = useSocialSignInMutation();
  const [logoutMutation] = useLogoutMutation();

  const localSignUp = useCallback(
    async (signUpLocalRequest: SignUpLocalRequest) => {
      if (validateInput(signUpLocalRequest)) {
        const accessToken = await localSignUpMutation(
          signUpLocalRequest,
        ).unwrap();
        if (accessToken) {
          dispatch(setAccessToken(accessToken.accessToken));
          return true;
        }
        return false;
      }
    },
    [dispatch, localSignUpMutation],
  );

  const localSignIn = useCallback(
    async (signInLocalRequest: SignInLocalRequest) => {
      if (validateInput(signInLocalRequest)) {
        const accessToken = await localSignInMutation(
          signInLocalRequest,
        ).unwrap();
        if (accessToken) {
          console.log('로그인');
          dispatch(setAccessToken(accessToken.accessToken));
          dispatch(setLoginType(AuthTypeEnum.LOCAL));
          return true;
        }
        return false;
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
        console.log('로그인');
        dispatch(setAccessToken(accessToken.accessToken));
        dispatch(setLoginType(signinSocialRequestDto.platform));
        return true;
      }
      return false;
    },
    [dispatch, socialSignInMutation],
  );

  const logout = useCallback(async () => {
    const success = await logoutMutation().unwrap();
    if (success) return true;
    return false;
  }, [logoutMutation]);

  const validateInput = (params: { id: string; password: string }) => {
    if (params.id.trim() === '' || params.password.trim() === '') {
      Toast.show({
        type: 'error',
        text1: '아이디 혹은 비밀번호를 입력해주세요.',
      });
      return false;
    }
    return true;
  };

  return { localSignUp, localSignIn, socialSignIn, logout };
}

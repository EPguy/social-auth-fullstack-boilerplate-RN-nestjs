import { Button, View } from 'react-native';
import { KakaoOAuthToken, login } from '@react-native-seoul/kakao-login';
import React from 'react';
import useAuth from '../hooks/useAuth';

const LoginScreen = () => {
  const { socialSignIn } = useAuth();
  const getAccessTokenKakao = async () => {
    const { accessToken }: KakaoOAuthToken = await login();

    const success = await socialSignIn({ accessToken, platform: 'kakao' });
    if (success) {
      console.log('성공');
    }
  };
  return (
    <View>
      <Button title="카카오 로그인" onPress={() => getAccessTokenKakao()} />
    </View>
  );
};

export default LoginScreen;

import { Button, TextInput } from 'react-native';
import * as kakao from '@react-native-seoul/kakao-login';
import { NaverLoginResponse } from '@react-native-seoul/naver-login';
import NaverLogin from '@react-native-seoul/naver-login';
import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import useUser from '../hooks/useUser';
import { Properties } from '../Properties';
import { SafeAreaView } from 'react-native-safe-area-context';

const SigninScreen = ({ navigation }: any) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const { getUserInfo } = useUser();
  const { localSignIn, socialSignIn } = useAuth();

  const loginWithLocal = async () => {
    const success = await localSignIn({
      id,
      password,
    });
    if (success) {
      await moveToLoggedScreen();
    }
  };

  const loginWithKakao = async () => {
    const { accessToken }: kakao.KakaoOAuthToken = await kakao.login();
    const success = await socialSignIn({ accessToken, platform: 'kakao' });
    if (success) {
      await moveToLoggedScreen();
    }
  };

  const loginWithNaver = async () => {
    const naverLoginResponse: NaverLoginResponse = await NaverLogin.login({
      appName: Properties.NAVER_APP_NAME,
      consumerKey: Properties.NAVER_CONSUMER_KEY,
      consumerSecret: Properties.NAVER_CONSUMER_SECRET,
      serviceUrlScheme: Properties.NAVER_URL_SCHEME,
    });

    if (naverLoginResponse.isSuccess) {
      const success = await socialSignIn({
        accessToken: naverLoginResponse.successResponse!.accessToken,
        platform: 'naver',
      });
      if (success) {
        await moveToLoggedScreen();
      }
    }
  };

  const moveToLoggedScreen = async () => {
    const user = await getUserInfo().unwrap();
    console.log(user);
    if (user.nickname) {
      navigation.reset({
        routes: [{ name: 'MainScreen' }],
      });
    } else {
      navigation.navigate('UpdateNicknameScreen');
    }
  };

  const moveToSignupScreen = () => {
    navigation.navigate('SignupScreen');
  };

  return (
    <SafeAreaView>
      <TextInput
        onChangeText={(text) => setId(text)}
        value={id}
        placeholder="아이디를 입력해주세요."
      />
      <TextInput
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
        placeholder="비밀번호를 입력해주세요."
      />
      <Button title="회원가입" onPress={() => moveToSignupScreen()} />
      <Button title="일반 로그인" onPress={() => loginWithLocal()} />
      <Button title="카카오 로그인" onPress={() => loginWithKakao()} />
      <Button title="네이버 로그인" onPress={() => loginWithNaver()} />
    </SafeAreaView>
  );
};

export default SigninScreen;

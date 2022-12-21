import { Button, TextInput, View } from 'react-native';
import { KakaoOAuthToken, login } from '@react-native-seoul/kakao-login';
import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useUser from '../hooks/useUser';
import CookieManager from '@react-native-cookies/cookies';
import { Properties } from '../Properties';

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
    const { accessToken }: KakaoOAuthToken = await login();

    const success = await socialSignIn({ accessToken, platform: 'kakao' });
    if (success) {
      await moveToLoggedScreen();
    }
  };

  const moveToLoggedScreen = async () => {
    const user = await getUserInfo().unwrap();
    if (user.nickname) {
      navigation.reset({
        routes: [{ name: 'UserInfoScreen' }],
      });
    } else {
      navigation.navigate('UpdateNicknameScreen');
    }
  };

  const moveToSignupScreen = () => {
    navigation.navigate('SignupScreen');
  };

  return (
    <View>
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
    </View>
  );
};

export default SigninScreen;

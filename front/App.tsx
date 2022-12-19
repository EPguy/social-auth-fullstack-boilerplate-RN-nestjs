import React from 'react';
import { Button, SafeAreaView, StyleSheet } from 'react-native';

import axios from 'axios';
import { KakaoOAuthToken, login } from '@react-native-seoul/kakao-login';
import { Properties } from './Properties';
import CookieManager from '@react-native-cookies/cookies';

const App = () => {
  const getAccessTokenKakao = async () => {
    const { accessToken }: KakaoOAuthToken = await login();
    const result = await axios.post(Properties.API_URL + 'auth/login/social', {
      accessToken: accessToken,
      platform: 'kakao',
    });
    console.log(accessToken);
  };

  return (
    <SafeAreaView>
      <Button title="카카오 로그인" onPress={() => getAccessTokenKakao()} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default App;

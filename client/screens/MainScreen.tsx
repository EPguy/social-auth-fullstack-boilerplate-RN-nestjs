import { Button, Text, View } from 'react-native';
import * as kakao from '@react-native-seoul/kakao-login';
import React from 'react';
import useUser from '../hooks/useUser';
import useAuth from '../hooks/useAuth';
import { useAppSelector } from '../store/config';
import { AuthTypeEnum } from '../enum/AuthTypeEnum';

const MainScreen = ({ navigation }: any) => {
  const { loginType } = useAppSelector((state) => state.auth);
  const { logout } = useAuth();
  const { userInfo, getUserInfo } = useUser();

  const doLogout = async () => {
    switch (loginType) {
      case AuthTypeEnum.KAKAO:
        await kakao.logout();
        break;
    }

    const success = await logout();
    if (success) {
      navigation.navigate('SigninScreen');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Text>{userInfo?.nickname}님 안녕하세요.</Text>
      <Button title="유저 정보 가져오기" onPress={() => getUserInfo()} />
      <Button title="로그아웃" onPress={() => doLogout()} />
    </View>
  );
};

export default MainScreen;

import { Button, StyleSheet, Text } from 'react-native';
import * as kakao from '@react-native-seoul/kakao-login';
import React from 'react';
import useUser from '../hooks/useUser';
import useAuth from '../hooks/useAuth';
import { useAppSelector } from '../store/config';
import { AuthTypeEnum } from '../enum/AuthTypeEnum';
import { SafeAreaView } from 'react-native-safe-area-context';

const MainScreen = ({ navigation }: any) => {
  const { loginType } = useAppSelector((state) => state.auth);
  const { logout } = useAuth();
  const { userInfo } = useUser();

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
    <SafeAreaView style={styles.conatiner}>
      <Text style={styles.nickname}>
        안녕하세요. {userInfo?.nickname}님 반갑습니다.
      </Text>
      <Button title="로그아웃" onPress={() => doLogout()} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nickname: {
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 15,
    marginBottom: 10,
  },
});

export default MainScreen;

import { Button, Text, View } from 'react-native';
import React from 'react';
import useUser from '../hooks/useUser';
import useAuth from '../hooks/useAuth';

const UserInfoScreen = ({ navigation }: any) => {
  const { logout } = useAuth();
  const { userInfo, getUserInfo } = useUser();
  const doLogout = async () => {
    const success = await logout();
    if (success) {
      navigation.navigate('SigninScreen');
    }
  };

  return (
    <View>
      <Text>{userInfo?.nickname}</Text>
      <Button title="유저 정보 가져오기" onPress={() => getUserInfo()} />
      <Button title="로그아웃" onPress={() => doLogout()} />
    </View>
  );
};

export default UserInfoScreen;

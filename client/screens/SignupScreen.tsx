import { Button, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import Toast from 'react-native-toast-message';

const SignupScreen = ({ navigation }: any) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const { localSignUp } = useAuth();
  const signUp = async () => {
    const success = await localSignUp({
      id,
      password,
    });
    if (success) {
      Toast.show({
        type: 'success',
        text1: '회원가입에 성공하였습니다.',
      });
      navigation.navigate('UpdateNicknameScreen');
    }
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
      <Button title="회원가입" onPress={() => signUp()} />
    </View>
  );
};

export default SignupScreen;

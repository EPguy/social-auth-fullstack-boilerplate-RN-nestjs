import { Button, StyleSheet, TextInput } from 'react-native';
import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomTextInput } from '../components/CustomTextInput/CustomTextInput';
import { CustomButton } from '../components/CustomButton/CustomButton';

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
    <SafeAreaView style={styles.conatiner}>
      <CustomTextInput
        onChangeText={(text) => setId(text)}
        value={id}
        placeholder="아이디를 입력해주세요."
        textLabel="아이디"
        style={{ marginBottom: 40 }}
      />
      <CustomTextInput
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder="비밀번호를 입력해주세요."
        textLabel="비밀번호"
      />
      <CustomButton
        text="회원가입"
        disabled={id.trim() === '' || password.trim() === ''}
        style={{ marginTop: 20 }}
        onPress={() => signUp()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    paddingTop: 38,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 71,
  },
});

export default SignupScreen;

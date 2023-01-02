import { Button, TextInput } from 'react-native';
import React, { useState } from 'react';
import useUser from '../hooks/useUser';
import { SafeAreaView } from 'react-native-safe-area-context';

const UpdateNicknameScreen = ({ navigation }: any) => {
  const { updateNickname } = useUser();
  const [nickname, setNickname] = useState('');

  const doUpdateNickname = async () => {
    const success = await updateNickname({
      nickname,
    });
    if (success) {
      navigation.reset({
        routes: [{ name: 'MainScreen' }],
      });
    }
  };

  return (
    <SafeAreaView>
      <TextInput
        onChangeText={(text) => setNickname(text)}
        value={nickname}
        placeholder="닉네임을 입력해주세요."
      />
      <Button title="닉네임 설정" onPress={() => doUpdateNickname()} />
    </SafeAreaView>
  );
};

export default UpdateNicknameScreen;

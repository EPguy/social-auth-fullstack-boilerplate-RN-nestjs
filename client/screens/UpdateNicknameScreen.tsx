import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import useUser from '../hooks/useUser';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomTextInput } from '../components/CustomTextInput/CustomTextInput';
import { CustomButton } from '../components/CustomButton/CustomButton';

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
    <SafeAreaView style={styles.conatiner}>
      <CustomTextInput
        onChangeText={(text) => setNickname(text)}
        value={nickname}
        placeholder="닉네임을 입력해주세요."
        textLabel="닉네임"
      />
      <CustomButton
        text="닉네임 설정"
        disabled={nickname.trim() === ''}
        style={{ marginTop: 20 }}
        onPress={() => doUpdateNickname()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 71,
  },
});

export default UpdateNicknameScreen;

import {
  useGetUserInfoQuery,
  useUpdateNicknameMutation,
} from '../api/user/api';
import { useCallback } from 'react';
import { UpdateNicknameRequest } from '../models/user/UpdateNicknameRequest';
import Toast from 'react-native-toast-message';

export default function useUser() {
  const { data: userInfo, refetch: getUserInfo } = useGetUserInfoQuery();
  const [updateNicknameMutation] = useUpdateNicknameMutation();
  const updateNickname = useCallback(
    async (updateNicknameRequest: UpdateNicknameRequest) => {
      if (validateInput(updateNicknameRequest)) {
        const user = await updateNicknameMutation(
          updateNicknameRequest,
        ).unwrap();
        if (user) {
          return true;
        }
        return false;
      }
    },
    [],
  );

  const validateInput = (params: { nickname: string }) => {
    if (params.nickname.trim() === '') {
      Toast.show({
        type: 'error',
        text1: '닉네임을 입력해주세요.',
      });
      return false;
    }
    return true;
  };

  return { userInfo, getUserInfo, updateNickname };
}

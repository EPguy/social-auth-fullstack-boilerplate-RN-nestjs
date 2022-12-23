import { Button, Text, TextInput, View } from 'react-native';
import * as kakao from '@react-native-seoul/kakao-login';
import React, { useEffect, useState } from 'react';
import useUser from '../hooks/useUser';
import useAuth from '../hooks/useAuth';
import { useAppSelector } from '../store/config';
import { AuthTypeEnum } from '../enum/AuthTypeEnum';
import useTodo from '../hooks/useTodo';

const MainScreen = ({ navigation }: any) => {
  const [title, setTitle] = useState('');
  const { loginType } = useAppSelector((state) => state.auth);
  const { logout } = useAuth();
  const { userInfo, getUserInfo } = useUser();
  const { data, getTodoList, insertTodo, deleteTodo, completeTodo } = useTodo();

  useEffect(() => {
    getTodoList(null);
  }, [getTodoList]);

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
    <View>
      <Text>{userInfo?.nickname}님 안녕하세요.</Text>
      <TextInput
        onChangeText={(text) => setTitle(text)}
        value={title}
        placeholder="Todo를 입력해주세요.."
      />
      <Button title="투두 저장" onPress={() => insertTodo({ title })} />
      <Button title="유저 정보 가져오기" onPress={() => getUserInfo()} />
      <Button title="로그아웃" onPress={() => doLogout()} />
      {data?.todos.map((todo, index) => {
        return (
          <View key={index}>
            <Text>{todo.title}</Text>
            <Text>{todo.isCompleted ? '완료' : '미완료'}</Text>
            <Button
              title="삭제"
              onPress={() => deleteTodo({ _id: todo._id })}
            />
            <Button
              title="완료"
              onPress={() => completeTodo(todo._id, !todo.isCompleted)}
            />
          </View>
        );
      })}
    </View>
  );
};

export default MainScreen;

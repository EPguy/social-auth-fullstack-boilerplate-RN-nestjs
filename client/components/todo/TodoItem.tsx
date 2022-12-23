import { Button, Text, View } from 'react-native';
import React from 'react';
import useTodo from '../../hooks/useTodo';
import { Todo } from '../../models/todo/Todo';

type TodoProps = {
  todo: Todo;
};

const TodoItem = ({ todo }: TodoProps) => {
  const { deleteTodo, completeTodo } = useTodo();
  return (
    <View style={{ flex: 1 }}>
      <Text>{todo.title}</Text>
      <Text>{todo.isCompleted ? '완료' : '미완료'}</Text>
      <Button title="삭제" onPress={() => deleteTodo({ _id: todo._id })} />
      <Button
        title="완료"
        onPress={() => completeTodo(todo._id, !todo.isCompleted)}
      />
    </View>
  );
};

export default TodoItem;

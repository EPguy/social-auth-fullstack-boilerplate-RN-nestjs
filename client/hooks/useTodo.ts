import {
  useDeleteTodoMutation,
  useGetTodoListQuery,
  useInsertTodoMutation,
  useUpdateTodoMutation,
} from '../api/todo/api';
import { useState } from 'react';
import { TodoInsertRequest } from '../models/todo/TodoInsertRequest';
import { TodoDeleteRequest } from '../models/todo/TodoDeleteRequest';
import Toast from 'react-native-toast-message';

export default function useTodo() {
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const { data, refetch: refetchTodoList } = useGetTodoListQuery({
    numTodos: 50,
    cursor: endCursor,
  });
  const [insertTodoMutation] = useInsertTodoMutation();
  const [deleteTodoMutation] = useDeleteTodoMutation();
  const [updateTodoMutation] = useUpdateTodoMutation();

  const getTodoList = (_endCursor: string | null) => {
    if (endCursor === endCursor) refetchTodoList();
    else setEndCursor(_endCursor);
  };

  const insertTodo = (todoInsertRequest: TodoInsertRequest) => {
    if (todoInsertRequest.title.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Todo 제목을 입력해주세요.',
      });
      return;
    }
    insertTodoMutation(todoInsertRequest);
  };

  const deleteTodo = (todoDeleteRequest: TodoDeleteRequest) => {
    deleteTodoMutation(todoDeleteRequest);
  };

  const completeTodo = (_id: string, isCompleted: boolean) => {
    updateTodoMutation({
      _id,
      isCompleted: isCompleted,
    });
  };

  return { data, getTodoList, insertTodo, deleteTodo, completeTodo };
}

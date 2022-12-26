import {
  todoApi,
  useDeleteTodoMutation,
  useLazyGetTodoListQuery,
  useInsertTodoMutation,
  useUpdateTodoMutation,
} from '../api/todo/api';
import { useCallback, useEffect } from 'react';
import { TodoInsertRequest } from '../models/todo/TodoInsertRequest';
import { TodoDeleteRequest } from '../models/todo/TodoDeleteRequest';
import Toast from 'react-native-toast-message';

export default function useTodo() {
  const [fetchTodos] = useLazyGetTodoListQuery();
  const { todos, pageInfo } = todoApi.endpoints.getTodoList.useQueryState(
    {
      cursor: null,
    },
    {
      selectFromResult: (result) => {
        return {
          todos: result.data?.todos,
          pageInfo: result.data?.pageInfo,
        };
      },
    },
  );
  const [insertTodoMutation] = useInsertTodoMutation();
  const [deleteTodoMutation] = useDeleteTodoMutation();
  const [updateTodoMutation] = useUpdateTodoMutation();

  useEffect(() => {
    fetchFirstPage();
  }, []);

  const fetchFirstPage = async () => {
    await fetchTodos({
      cursor: null,
    });
  };

  const fetchNextPage = useCallback(async () => {
    if (!pageInfo?.hasNextPage) return;
    await fetchTodos({
      cursor: pageInfo!.endCursor,
    });
  }, [pageInfo]);

  const insertTodo = useCallback((todoInsertRequest: TodoInsertRequest) => {
    if (todoInsertRequest.title.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Todo 제목을 입력해주세요.',
      });
      return;
    }
    insertTodoMutation(todoInsertRequest);
  }, []);

  const deleteTodo = useCallback((todoDeleteRequest: TodoDeleteRequest) => {
    deleteTodoMutation(todoDeleteRequest);
  }, []);

  const completeTodo = useCallback((_id: string, isCompleted: boolean) => {
    updateTodoMutation({
      _id,
      isCompleted: isCompleted,
    });
  }, []);

  return {
    todos,
    fetchNextPage,
    insertTodo,
    deleteTodo,
    completeTodo,
  };
}

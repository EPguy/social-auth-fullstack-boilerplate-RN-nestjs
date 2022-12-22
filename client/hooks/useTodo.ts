import {
  useDeleteTodoMutation,
  useGetTodoListQuery,
  useInsertTodoMutation,
  useUpdateTodoMutation,
} from '../api/todo/api';
import { useState } from 'react';
import { TodoInsertRequest } from '../models/todo/TodoInsertRequest';
import { TodoDeleteRequest } from '../models/todo/TodoDeleteRequest';
import { TodoUpdateRequest } from '../models/todo/TodoUpdateRequest';

export default function useTodo() {
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const { data } = useGetTodoListQuery({
    numTodos: 5,
    cursor: endCursor,
  });
  const [insertTodoMutation] = useInsertTodoMutation();
  const [deleteTodoMutation] = useDeleteTodoMutation();
  const [updateTodoMutation] = useUpdateTodoMutation();

  const getTodoList = (_endCursor: string | null) => {
    setEndCursor(_endCursor);
  };

  const insertTodo = (todoInsertRequest: TodoInsertRequest) => {
    insertTodoMutation(todoInsertRequest);
  };

  const deleteTodo = (todoDeleteRequest: TodoDeleteRequest) => {
    deleteTodoMutation(todoDeleteRequest);
  };

  const updateTodo = (todoUpdateRequest: TodoUpdateRequest) => {
    updateTodoMutation(todoUpdateRequest);
  };

  return { data, getTodoList, insertTodo, deleteTodo, updateTodo };
}

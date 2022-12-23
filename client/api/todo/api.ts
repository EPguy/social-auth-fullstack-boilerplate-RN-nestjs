import { createApi } from '@reduxjs/toolkit/query/react';
import { AxiosBaseQuery } from '../axiosBaseQuery';
import { TodoListRequest } from '../../models/todo/TodoListRequest';
import { TodoListResponse } from '../../models/todo/TodoListResponse';
import { TodoInsertRequest } from '../../models/todo/TodoInsertRequest';
import { Todo } from '../../models/todo/Todo';
import { TodoDeleteRequest } from '../../models/todo/TodoDeleteRequest';
import { TodoUpdateRequest } from '../../models/todo/TodoUpdateRequest';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: AxiosBaseQuery,
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getTodoList: builder.query<TodoListResponse, TodoListRequest>({
      query: (data) => {
        return {
          url: 'todo',
          method: 'GET',
          params: data.cursor
            ? data
            : {
                numTodos: data.numTodos,
              },
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.todos.map(({ _id }) => ({
                type: 'Todos' as const,
                id: _id,
              })),
              { type: 'Todos', id: 'TODO-LIST' },
            ]
          : [{ type: 'Todos', id: 'TODO-LIST' }],
    }),
    insertTodo: builder.mutation<Todo, TodoInsertRequest>({
      query: (data) => {
        return {
          url: 'todo',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: (result) => [
        { type: 'Todos', id: result?._id },
        { type: 'Todos', id: 'TODO-LIST' },
      ],
    }),
    deleteTodo: builder.mutation<Todo, TodoDeleteRequest>({
      query: (data) => {
        return {
          url: 'todo',
          method: 'DELETE',
          body: data,
        };
      },
      invalidatesTags: (result) => [
        { type: 'Todos', id: result?._id },
        { type: 'Todos', id: 'TODO-LIST' },
      ],
    }),
    updateTodo: builder.mutation<Todo, TodoUpdateRequest>({
      query: (data) => {
        return {
          url: 'todo',
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: (result) => [
        { type: 'Todos', id: result?._id },
        { type: 'Todos', id: 'TODO-LIST' },
      ],
    }),
  }),
});

export const {
  useGetTodoListQuery,
  useInsertTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = todoApi;

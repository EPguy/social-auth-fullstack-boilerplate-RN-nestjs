import { Todo } from './Todo';
import { TodoPageInfo } from './TodoPageInfo';

export interface TodoListResponse {
  todos: Todo[];
  pageInfo: TodoPageInfo;
}

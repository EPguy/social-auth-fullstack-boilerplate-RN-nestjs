import { Todo } from '../schemas/todo.schema';
import { TodoPageInfoDto } from './todo-page-info.dto';

export class TodoListResponseDto {
  todos: Todo[];
  pageInfo: TodoPageInfoDto;
}

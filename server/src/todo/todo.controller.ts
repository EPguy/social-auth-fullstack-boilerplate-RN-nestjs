import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put, Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';
import { IGetUserAuthInfoRequest } from '../common/interface/IGetUserAuthInfoRequest';
import { TodoListResponseDto } from './dto/todo-list-response.dto';
import { TodoGetRequestDto } from './dto/todo-get-request.dto';
import { TodoInsertRequestDto } from './dto/todo-insert-request.dto';
import { Todo } from './schemas/todo.schema';
import { TodoDeleteRequestDto } from './dto/todo-delete-request.dto';
import { TodoUpdateRequestDto } from './dto/todo-update-request.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  async getTodoList(
    @Req() req: IGetUserAuthInfoRequest,
    @Query() todoPaginationDto: TodoGetRequestDto,
  ): Promise<TodoListResponseDto> {
    return this.todoService.getTodoList(
      todoPaginationDto,
      req.user._id.toString(),
    );
  }

  @UseGuards(AccessTokenGuard)
  @Post()
  async insertTodo(
    @Req() req: IGetUserAuthInfoRequest,
    @Body() todoInsertRequestDto: TodoInsertRequestDto,
  ): Promise<Todo> {
    return this.todoService.insert(
      todoInsertRequestDto,
      req.user._id.toString(),
    );
  }

  @UseGuards(AccessTokenGuard)
  @Delete()
  async deleteTodo(
    @Req() req: IGetUserAuthInfoRequest,
    @Body() todoDeleteRequestDto: TodoDeleteRequestDto,
  ): Promise<Todo> {
    return this.todoService.delete(
      todoDeleteRequestDto,
      req.user._id.toString(),
    );
  }

  @UseGuards(AccessTokenGuard)
  @Put()
  async updateTodo(
    @Req() req: IGetUserAuthInfoRequest,
    @Body() todoUpdateRequestDto: TodoUpdateRequestDto,
  ): Promise<Todo> {
    return this.todoService.update(
      todoUpdateRequestDto,
      req.user._id.toString(),
    );
  }
}

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDocument } from './schemas/todo.schema';
import { TodoGetRequestDto } from './dto/todo-get-request.dto';
import { TodoListResponseDto } from './dto/todo-list-response.dto';
import { TodoPageInfoDto } from './dto/todo-page-info.dto';
import { TodoInsertRequestDto } from './dto/todo-insert-request.dto';
import { TodoDeleteRequestDto } from './dto/todo-delete-request.dto';
import { TodoUpdateRequestDto } from './dto/todo-update-request.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name)
    private readonly todoModel: Model<TodoDocument>,
  ) {}

  async getTodoList(
    todoPaginationDto: TodoGetRequestDto,
    userId: string,
  ): Promise<TodoListResponseDto> {
    const todos = await this.findByPaging(todoPaginationDto, userId);
    const endCursor =
      todos.length > 0 ? todos[todos.length - 1]._id.toString() : null;
    const hasNextPage =
      todos.length > 0
        ? await this.existsByIdOlderThan(endCursor, userId)
        : false;
    const pageInfo: TodoPageInfoDto = {
      hasNextPage,
      endCursor,
    };
    return {
      todos,
      pageInfo,
    };
  }

  async insert(
    todoInsertRequestDto: TodoInsertRequestDto,
    userId: string,
  ): Promise<Todo> {
    return this.todoModel.create({
      user: userId,
      title: todoInsertRequestDto.title,
    });
  }

  async delete(
    todoDeleteRequestDto: TodoDeleteRequestDto,
    userId: string,
  ): Promise<Todo> {
    return this.todoModel.findOneAndRemove(
      {
        _id: todoDeleteRequestDto._id,
        user: userId,
      },
      {
        new: true,
      },
    );
  }

  async update(
    todoUpdateRequestDto: TodoUpdateRequestDto,
    userId: string,
  ): Promise<Todo> {
    return this.todoModel.findOneAndUpdate(
      {
        _id: todoUpdateRequestDto._id,
        user: userId,
      },
      {
        isCompleted: todoUpdateRequestDto.isCompleted,
      },
      {
        new: true,
      },
    );
  }

  protected async findByPaging(
    todoPagination: TodoGetRequestDto,
    userId: string,
  ): Promise<Todo[]> {
    return this.todoModel
      .find(
        todoPagination.cursor
          ? {
              user: userId,
              _id: { $lt: todoPagination.cursor },
            }
          : {
              user: userId,
            },
      )
      .sort({
        _id: -1,
      })
      .limit(todoPagination.numTodos)
      .exec();
  }

  protected async existsByIdOlderThan(
    endCursor: string,
    userId: string,
  ): Promise<boolean> {
    return (
      (await this.todoModel.count({
        userId,
        _id: { $lt: endCursor },
      })) > 0
    );
  }
}

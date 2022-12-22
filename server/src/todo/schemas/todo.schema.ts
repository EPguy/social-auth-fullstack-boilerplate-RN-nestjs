import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../../user/schemas/user.schema';

export type TodoDocument = HydratedDocument<Todo>;

@Schema()
export class Todo {
  _id: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  user: User;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true, default: false })
  isCompleted: boolean;

  @Prop({ required: true, default: Date.now() })
  createdDate: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);

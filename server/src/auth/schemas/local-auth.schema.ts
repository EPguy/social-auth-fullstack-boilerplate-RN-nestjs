import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../../user/schemas/user.schema';

export type LocalAuthDocument = HydratedDocument<LocalAuth>;

@Schema()
export class LocalAuth {
  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  user: User;

  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  password: string;
}

export const LocalAuthSchema = SchemaFactory.createForClass(LocalAuth);

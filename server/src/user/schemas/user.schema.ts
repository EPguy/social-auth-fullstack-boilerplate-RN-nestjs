import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { RefreshToken } from '../../auth/schemas/refresh-token.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  _id: Types.ObjectId;

  @Prop()
  nickname: string;

  @Prop({ required: true, type: Types.ObjectId, ref: RefreshToken.name })
  refreshToken: RefreshToken;
}

export const UserSchema = SchemaFactory.createForClass(User);

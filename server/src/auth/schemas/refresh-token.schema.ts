import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RefreshTokenDoucment = HydratedDocument<RefreshToken>;

@Schema()
export class RefreshToken {
  _id: string;

  @Prop()
  refreshToken: string;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);

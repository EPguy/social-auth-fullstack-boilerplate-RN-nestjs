import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../../user/schemas/user.schema';

export type SocialAuthDocument = HydratedDocument<SocialAuth>;

@Schema()
export class SocialAuth {
  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  user: User;

  @Prop({ required: true, unique: true })
  snsServiceId: string;

  @Prop({ required: true })
  platform: string;
}

export const SocialAuthSchema = SchemaFactory.createForClass(SocialAuth);

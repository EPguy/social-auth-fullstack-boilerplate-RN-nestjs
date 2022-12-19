import { User } from '../../user/schemas/user.schema';

export interface IGetUserAuthInfoRequest extends Request {
  user: User;
}

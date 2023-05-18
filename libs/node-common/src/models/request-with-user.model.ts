import { UserDto } from '@infosys/dtos';
import type { Request } from 'express';

export interface RequestWithUser<T = any> extends Request<T> {
  user: UserDto;
}

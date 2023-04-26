import { UserDto } from '@infosys/dtos';
import type { Request } from 'express';

export interface RequestWithUser extends Request {
  user: UserDto;
}

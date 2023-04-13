import { Request } from 'express';

export interface RequeustWithUser extends Request {
  user: { name: string };
}

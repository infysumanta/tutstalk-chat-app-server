import { IUser } from '../interfaces/models';

/**
 * Extends the Express Request interface to include a user property.
 */
declare global {
  namespace Express {
    interface Request {
      user: IUser | undefined;
    }
  }
}

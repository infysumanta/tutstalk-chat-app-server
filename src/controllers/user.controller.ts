import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/user.model';
import { FilterQuery } from 'mongoose';
import { IUser } from '../interfaces/models';

/**
 * Retrieves all users based on the search query.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A list of users matching the search query.
 */
export const allUsers = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const keyword: FilterQuery<IUser> = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search as string, $options: 'i' } },
            { email: { $regex: req.query.search as string, $options: 'i' } }
          ]
        }
      : {};

    const users = await User.find(keyword).find({
      _id: { $ne: req.user?._id }
    });
    res.send(users);
  }
);

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { IUser } from '../interfaces/models';
import asyncHandler from '../lib/asyncHandler';

/**
 * Middleware to protect routes that require authentication.
 * It checks for a valid JWT token in the request headers and verifies it.
 * If the token is valid, it sets the user object in the request and calls the next middleware.
 * If the token is invalid or missing, it throws an error with the appropriate status code.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The Express next function.
 * @throws {Error} - If the token is invalid or missing.
 */
export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1];

        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET!
        ) as jwt.JwtPayload;

        req.user = (await User.findById(decoded.id).select(
          '-password'
        )) as IUser;

        next();
      } catch (error) {
        res.status(401);
        throw new Error('Not authorized, token failed');
      }
    }

    if (!token) {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  }
);

import { Request, Response } from 'express';
import User from '../models/user.model';
import { generateToken } from '../lib/jwt';
import asyncHandler from '../lib/asyncHandler';

/**
 * Login user and generate authentication token.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns The JSON response containing user details and authentication token.
 * @throws Error if the email or password is invalid.
 */
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id)
    });
  } else {
    res.status(401);
    throw new Error('Invalid Email or Password');
  }
});

/**
 * Registers a new user.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A JSON response containing the user details and a token.
 * @throws Error if required fields are missing or if the user already exists.
 */
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Please Enter all the Feilds');
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const user = await User.create({
      name,
      email,
      password,
      pic
    });

    if (!user) {
      res.status(400);
      throw new Error('User not found');
    }

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id)
    });
  }
);

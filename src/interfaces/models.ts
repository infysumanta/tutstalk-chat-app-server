import mongoose, { Document } from 'mongoose';

/**
 * Represents a user in the system.
 */
interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  _doc: IUser;
  name: string;
  email: string;
  password: string;
  pic: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;

  /**
   * Checks if the entered password matches the user's password.
   * @param enteredPassword - The password entered by the user.
   * @returns A promise that resolves to a boolean indicating whether the passwords match.
   */
  matchPassword(enteredPassword: string): Promise<boolean>;
}

/**
 * Represents a chat in the application.
 */
interface IChat extends Document {
  _id: mongoose.Types.ObjectId;
  _doc: IChat;
  chatName: string;
  isGroupChat: boolean;
  users: IUser[];
  latestMessage: IMessage;
  groupAdmin: IUser;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Represents a message in the chat application.
 */
interface IMessage extends Document {
  _id: mongoose.Types.ObjectId;
  _doc: IMessage;
  sender: IUser;
  content: string;
  chat: IChat;
  readBy: IUser[];
  createdAt: Date;
  updatedAt: Date;
}

export { IUser, IChat, IMessage };

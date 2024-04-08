import { Document } from 'mongoose';

interface IUser extends Document {
  _id: IUser;
  name: string;
  email: string;
  password: string;
  pic: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

interface IChat extends Document {
  _id: IChat;
  chatName: string;
  isGroupChat: boolean;
  users: IUser[];
  latestMessage: IMessage;
  groupAdmin: IUser;
  createdAt: Date;
  updatedAt: Date;
}

interface IMessage extends Document {
  _id: IMessage;
  sender: IUser;
  content: string;
  chat: IChat;
  readBy: IUser[];
  createdAt: Date;
  updatedAt: Date;
}

export { IUser, IChat, IMessage };

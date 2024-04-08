import mongoose from 'mongoose';
import { IChat } from '../interfaces/models';

const chatSchema = new mongoose.Schema<IChat>(
  {
    chatName: {
      type: String,
      trim: true
    },
    isGroupChat: {
      type: Boolean,
      default: false
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message'
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

const Chat = mongoose.model<IChat>('Chat', chatSchema);

export default Chat;

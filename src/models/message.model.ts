import mongoose from 'mongoose';
import { IMessage } from '../interfaces/models';

const messageSchema = new mongoose.Schema<IMessage>(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    content: {
      type: String,
      trim: true
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat'
    },
    readBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  { timestamps: true }
);

const Message = mongoose.model<IMessage>('Message', messageSchema);
module.exports = Message;

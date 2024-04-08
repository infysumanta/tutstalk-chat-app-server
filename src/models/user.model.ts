import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '../interfaces/models';

/**
 * Represents a user in the application.
 */
const userSchema = new mongoose.Schema<IUser>(
  {
    /**
     * The name of the user.
     */
    name: {
      type: String,
      required: true
    },
    /**
     * The email address of the user.
     */
    email: {
      type: String,
      required: true,
      unique: true
    },
    /**
     * The password of the user.
     */
    password: {
      type: String,
      required: true
    },
    /**
     * The profile picture URL of the user.
     */
    pic: {
      type: 'String',
      required: true,
      default:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
    },
    /**
     * Indicates whether the user is an admin or not.
     */
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret) => {
        delete ret.password;
        return ret;
      }
    }
  }
);

/**
 * Compares the entered password with the user's password.
 * @param enteredPassword - The password entered by the user.
 * @returns A promise that resolves to a boolean indicating whether the passwords match.
 */
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

/**
 * Hashes the user's password before saving it.
 */
userSchema.pre('save', async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/**
 * Represents a User model in the database.
 */
const User = mongoose.model<IUser>('User', userSchema);

export default User;

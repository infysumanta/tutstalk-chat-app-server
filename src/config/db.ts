import mongoose from 'mongoose';
const colors = require('colors');

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.DATABASE_URI!);
    console.log(
      colors.cyan.underline(`MongoDB connected: ${connection.connection.host}`)
    );
  } catch (error: any) {
    console.error(colors.red.underline(`Error: ${error.message}`));
    process.exit(1);
  }
};

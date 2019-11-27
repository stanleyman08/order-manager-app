require('dotenv/config');
import mongoose from 'mongoose';

const MONGO_URL = process.env.NODE_ENV == 'dev' ? process.env.MONGO_URL_DEV : process.env.MONGO_URL_TEST;
export const connectDB = async () => {
  try {
    await mongoose.connect(
        MONGO_URL,
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
      }
    );

    return 'MongoDB is Connected...';
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

import mongoose from "mongoose";

const connectDb = async (DATABASE_URL: string) => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("connection successfull");
  } catch (err) {
    console.log("Connection faild", err);
  }
};
export default connectDb;

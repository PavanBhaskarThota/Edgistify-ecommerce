import mongoose from "mongoose";
import "dotenv/config";

const connectDB = mongoose.connect(process.env.MONGO_URL as string);

export {connectDB}
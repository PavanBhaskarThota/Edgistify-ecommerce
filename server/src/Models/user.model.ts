import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/,
      unique: true,
    },
    password: { type: String, required: true, minlength: 8 }
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("user", userSchema);

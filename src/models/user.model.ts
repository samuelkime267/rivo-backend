import mongoose, { InferSchemaType, Types } from "mongoose";
import { Document } from "mongoose";
import { profile } from "node:console";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    // required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // required: true,
  },
  authProvider: {
    type: String,
    enum: ["local", "google"],
    default: "local",
  },
  providerId: {
    type: String,
    default: null,
  },
  profilePicture: {
    type: String,
    default: null,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
});

export type UserType = InferSchemaType<typeof userSchema>;

const User = mongoose.model("User", userSchema);

export default User;

export type UserDocument = Document<unknown, any, UserType> &
  UserType & { _id: Types.ObjectId };

import { Schema, model } from "mongoose";

export interface IUser {
  _id?: string;
  username: string;
  email: string;
  password: string;
  isOnline: boolean;
  friends: string[];
}

const User = new Schema<IUser>({
  _id: Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isOnline: {
    type: Boolean,
  },
  friends: Array,
});

const UserModel = model("UserModel", User);
export { UserModel };

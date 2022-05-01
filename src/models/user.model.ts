import { Schema, model } from "mongoose";

export interface IUser {
  _id?: string;
  username: string;
  email: string;
  password: string;
  online: boolean;
  friends: string[];
  hash: string;
  dateRegistration: number;
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
  friends: Array,
  dateRegistration: Number,
  hash: String,
  online: Boolean,
});

const UserModel = model("UserModel", User);
export { UserModel };

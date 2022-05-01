import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/auth.interface";

const User = new Schema<IUser>(
  {
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
    salt: String,
    online: Boolean,
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret): any {
        delete ret.password;
        delete ret.salt;
        delete ret.id;
        return ret;
      },
    },
    timestamps: true,
  },
);

const UserModel = model("UserModel", User);
export { UserModel };

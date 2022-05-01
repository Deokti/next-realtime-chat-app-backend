import { injectable } from "inversify";
import "reflect-metadata";
import { IUser, UserModel } from "../models/user.model";
import { IUsersRepository } from "./users.repository.interface";
import { Types } from "mongoose";
import { СonditionFind } from "./users.controller.interface";

@injectable()
export class UsersRepository implements IUsersRepository {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async create({
    email,
    password,
    username,
    friends,
    online,
    dateRegistration,
    hash,
  }: IUser) {
    return UserModel.create({
      _id: new Types.ObjectId(),
      email,
      friends,
      online,
      password,
      username,
      dateRegistration,
      hash,
    });
  }

  async get(_id: string): Promise<IUser | null> {
    return UserModel.findById(_id);
  }

  async getAll(): Promise<IUser[]> {
    return UserModel.find({});
  }

  async find(condition: СonditionFind): Promise<IUser | null> {
    return await UserModel.findOne(condition);
  }
}

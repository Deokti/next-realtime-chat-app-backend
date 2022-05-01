import { IUsersController, СonditionFind } from "./users.controller.interface";
import "reflect-metadata";
import { inject, injectable } from "inversify";
import { INVERSIFY_TYPES } from "../config/inversify.types";
import { UsersService } from "./users.service";
import { IRegister, IUser, ILogin } from "../interfaces/auth.interface";

@injectable()
export class UsersController implements IUsersController {
  constructor(
    @inject(INVERSIFY_TYPES.UsersService) private usersService: UsersService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async create(data: IRegister): Promise<IUser> {
    return this.usersService.create(data);
  }

  async verification(data: ILogin): Promise<IUser | null> {
    return this.usersService.verification(data);
  }

  async find(condition: СonditionFind): Promise<IUser | null> {
    return this.usersService.find(condition);
  }

  getAll(): Promise<IUser[]> {
    throw new Error("Method not implemented.");
  }
}

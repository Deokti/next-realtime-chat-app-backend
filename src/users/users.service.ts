import { inject, injectable } from "inversify";
import "reflect-metadata";
import { ConfigService } from "../config/config.service";
import { INVERSIFY_TYPES } from "../config/inversify.types";
import { IRegister } from "../models/auth.model";
import { IUser } from "../models/user.model";
import { User } from "./user.entity";
import { СonditionFind } from "./users.controller.interface";
import { UsersRepository } from "./users.repository";

@injectable()
export class UsersService {
  constructor(
    @inject(INVERSIFY_TYPES.ConfigService) private config: ConfigService,
    // eslint-disable-next-line prettier/prettier
    @inject(INVERSIFY_TYPES.UsersRepository)
    private repository: UsersRepository,
  ) {}

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async create({ email, password, username }: IRegister) {
    const user = new User(username, email);
    const salt = Number(this.config.get("SALT")) || 14;
    await user.setPassword(password, salt);

    return this.repository.create(user);
  }

  async find(condition: СonditionFind): Promise<IUser | null> {
    return this.repository.find(condition);
  }
}

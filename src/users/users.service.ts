import { inject, injectable } from "inversify";
import "reflect-metadata";
import { ConfigService } from "../config/config.service";
import { INVERSIFY_TYPES } from "../config/inversify.types";
import { IRegister, ILogin, IUser } from "../interfaces/auth.interface";
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
    const key = Number(this.config.get("PUBLIC_KEY")) || 14;
    await user.setPassword(password, key);

    return this.repository.create(user);
  }

  async verification({ email, password }: ILogin): Promise<IUser | null> {
    const find = await this.find({ email });

    if (!find) return null;

    const user = new User("", email, find.password, find.salt);
    return (await user.comparePassword(password)) ? find : null;
  }

  async find(condition: СonditionFind): Promise<IUser | null> {
    return this.repository.find(condition);
  }
}

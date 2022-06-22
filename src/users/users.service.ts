import { inject, injectable } from "inversify";
import "reflect-metadata";
import { IConfigService } from "../config/config.service.interface";
import { INVERSIFY_TYPES } from "../config/inversify.types";
import { IRegister, ILogin, IUser } from "../interfaces/auth.interface";
import { User } from "./user.entity";
import { СonditionFind } from "./users.controller.interface";
import { IUsersRepository } from "./users.repository.interface";
import { IUsersService } from "./users.service.interface";

@injectable()
export class UsersService implements IUsersService {
  constructor(
    @inject(INVERSIFY_TYPES.ConfigService) private config: IConfigService,
    // eslint-disable-next-line prettier/prettier
    @inject(INVERSIFY_TYPES.UsersRepository) private repo: IUsersRepository,
  ) {}

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async create({ email, password, username }: IRegister) {
    const user = new User(username, email);
    const key = Number(this.config.get("PUBLIC_KEY")) || 14;
    await user.setPassword(password, key);

    return this.repo.create(user);
  }

  async verification({ email, password }: ILogin): Promise<IUser | null> {
    const find = await this.find({ email });
    if (!find) return null;

    const user = new User("", email, find.password, find.salt);
    return (await user.comparePassword(password)) ? find : null;
  }

  async find(condition: СonditionFind): Promise<IUser | null> {
    return this.repo.find(condition);
  }
}

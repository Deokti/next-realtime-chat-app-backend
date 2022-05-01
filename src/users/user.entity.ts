import { hash, compare } from "bcryptjs";
import csprng from "csprng";
import { IUser } from "../interfaces/auth.interface";

export class User implements IUser {
  private _username: string;
  private _email: string;
  private _online: boolean;
  private _friends: string[];
  private _password: string;
  private _salt: string;

  constructor(
    username: string,
    email: string,
    password?: string,
    salt?: string,
  ) {
    if (password) this._password = password;

    if (salt) {
      this._salt = salt;
    } else {
      this._salt = csprng(140, 20);
    }

    this._email = email;
    this._username = username;
    this._online = false;
    this._friends = [];
  }

  // Присоединяем к паролю рандомный hash и хешируем солью
  async setPassword(password: string, salt: number): Promise<void> {
    this._password = await hash(password + this._salt, salt);
  }

  // Для использования этой функции, необходимо передать необязательные параметры
  // 1. Пароль пользователя из БД
  // 2. Сгенерируемый hash
  async comparePassword(password: string): Promise<boolean> {
    return compare(password + this._salt, this._password);
  }

  get username(): string {
    return this._username;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get friends(): string[] {
    return this._friends;
  }

  get online(): boolean {
    return this._online;
  }

  get salt(): string {
    return this._salt;
  }
}

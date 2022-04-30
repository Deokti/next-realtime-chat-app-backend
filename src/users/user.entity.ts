import { hash } from "bcryptjs";

export class User {
  private _username: string;
  private _email: string;
  private _isOnline: boolean;
  private _friends: string[];
  private _password: string;

  constructor(username: string, email: string) {
    this._email = email;
    this._username = username;
    this._isOnline = false;
    this._friends = [];
  }

  async setPassword(password: string, salt: number): Promise<void> {
    this._password = await hash(password, salt);
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

  get isOnline(): boolean {
    return this._isOnline;
  }
}

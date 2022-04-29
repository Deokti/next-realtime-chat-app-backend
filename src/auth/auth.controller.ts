import { Router, Request, Response } from "express";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class AuthController {
  private readonly _router: Router;

  constructor() {
    this._router = Router();
    this._router.get("/login", this.login);
    this._router.post("/register", this.register);
  }

  get router(): Router {
    return this._router;
  }

  login(req: Request, res: Response): void {
    res.send("LOGIN");
  }

  register(req: Request, res: Response): void {
    res.send("REGISTER");
  }
}

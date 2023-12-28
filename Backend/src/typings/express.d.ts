import { User } from "../src/middlewares/auth";

declare namespace Express {
  interface Request {
    user?: User;
  }
}

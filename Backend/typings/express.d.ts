import { User } from "../middlewares/auth";

declare namespace Express {
  interface Request {
    user?: User;
  }
}

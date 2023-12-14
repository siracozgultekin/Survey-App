import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
import { decode } from "punycode";

// Extend the JwtPayload type with the user property
declare module "jsonwebtoken" {
  interface ExtendedJwtPayload extends JwtPayload {
    user?: User;
  }
}

export type User = {
  id: number;
  is_admin: false;
  name: string;
  surname: string;
  email: string;
  password: string;
  registration_date: Date;
  participated_surveys: string[];
};

dotenv.config();
const secretKey = process.env.JWT_SECRET as string;

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header("Authorization");

  try {
    if (!token) {
      return res.sendStatus(401);
    }

    const decoded = jwt.verify(token, secretKey) as jwt.ExtendedJwtPayload;

    req.user = decoded.user;

    next();
  } catch (error) {
    res.sendStatus(500);
  }
}

export default authenticateToken;

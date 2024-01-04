import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../types";

interface ExtendedJwtPayload extends JwtPayload {
  user?: User;
}

dotenv.config();
const secretKey = process.env.JWT_SECRET as string;

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header("Authorization");

  try {
    if (!token) {
      return res.sendStatus(401);
    }

    const decoded = jwt.verify(token, secretKey) as ExtendedJwtPayload;

    req.user = decoded.user;

    next();
  } catch (error) {
    res.sendStatus(500);
  }
}

export default authenticateToken;

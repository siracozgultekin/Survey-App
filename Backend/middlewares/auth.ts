import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
import { decode } from "punycode";

// This is a hack to add the user property to the Request interface
declare global {
  namespace Express {
    interface Request {
      user: {
        id: number;
        is_admin: false;
        name: string;
        surname: string;
        email: string;
        password: string;
        registration_date: string;
        participated_surveys: string[];
      };
      iat: number;
      exp: number;
    }
  }
}
// declare global {
//   namespace Express {
//     interface Request {
//       payload?: JwtPayload;
//     }
//   }
// }

// declare module "jsonwebtoken" {
//   interface JwtPayload {
//     [key: string]: any;
//     iss?: string | undefined;
//     sub?: string | undefined;
//     aud?: string | string[] | undefined;
//     exp?: number | undefined;
//     nbf?: number | undefined;
//     iat?: number | undefined;
//     jti?: string | undefined;
//     user?:
//       | {
//           id: number;
//           username: string;
//           email: string;
//           // Add other user-related properties here
//         }
//       | undefined;
//   }
// }

type User = {
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

  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(token, secretKey, (err, decodedtoken) => {
    if (err) {
      return res.sendStatus(403);
    }
    console.log("decodedtokenoutputu=> ", decodedtoken);

    req.body = decodedtoken as User;
    console.log("requserOUT=>", req.body);
    next();
  });
}

export default authenticateToken;

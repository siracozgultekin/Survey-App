import express, { Express, Request, Response } from "express";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ZodError } from "zod";

import dbpool from "../../db";

import authenticateToken from "../middlewares/auth";

import { User } from "../types";
import { registerSchema } from "../validators";

const router = express.Router();

//* Register
router.post(
  "/register",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const { is_admin: isAdmin } = req.user as User;

      if (!isAdmin) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { name, surname, email, password, department, is_admin } =
        registerSchema.parse(req.body);

      const hashedPassword = await bcrypt.hash(password, 10);

      const existingUser = await dbpool.query(
        "SELECT * FROM public.users WHERE email = $1",
        [email]
      );

      if (existingUser.rows.length > 0) {
        return res.status(400).json({ error: "User already exists" });
      }

      await dbpool.query(
        "INSERT INTO public.users (is_admin, name, surname, password, email, department, participated_surveys) VALUES($1, $2, $3, $4, $5, $6,$7)",
        [is_admin, name, surname, hashedPassword, email, department, []]
      );

      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.errors.flat() });
      }

      res.status(500).json({ message: "Registration failed" });
    }
  }
);

//* Login
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await dbpool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (!user.rows[0]) {
      return res.status(401).json({ error: "User not found" });
    }

    const valid = await bcrypt.compare(password, user.rows[0].password);
    if (!valid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { user: user.rows[0] },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "8h", // Token expiration time
      }
    );

    res
      .cookie("token", token, { secure: true, httpOnly: false })
      .json({ message: "Login successful" });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

//* Update Password
router.post(
  "/updatepassword",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const jwtUser = req.user as User;

      if (!jwtUser) return res.status(401).json({ error: "User not found" });

      const { newPassword, oldPassword } = req.body;

      const user = await dbpool.query("SELECT * FROM users WHERE id = $1", [
        jwtUser.id,
      ]);

      const userPass = user.rows[0].password;

      const valid = await bcrypt.compare(oldPassword, userPass);

      if (!valid) {
        return res.status(401).json({ error: "Invalid password" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const isSame = await bcrypt.compare(newPassword, userPass);

      if (isSame) {
        return res
          .status(401)
          .json({ error: "New password cannot be the same as old password" });
      }

      await dbpool.query("UPDATE users SET password = $1 WHERE id = $2", [
        hashedPassword,
        jwtUser.id,
      ]);

      res.json({ message: "Password updated" });
    } catch (error) {
      console.log("update password failed:", error);
      res.status(500).json({ error: "Update password failed" });
    }
  }
);

export default router;

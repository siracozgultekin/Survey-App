import express, { Request, Response } from "express";
import dbpool from "../../db";
import authenticateToken from "../middlewares/auth";
import { User } from "../types";

const router = express.Router();

//* Get users by department
router.get(
  "/users/:department",
  authenticateToken,
  async (req: Request, res: Response) => {
    const department = req.params.department;
    const { is_admin } = req.user as User;

    try {
      const users = is_admin
        ? await dbpool.query("SELECT * FROM users ORDER BY name")
        : await dbpool.query(
            "SELECT * FROM users WHERE department = $1 ORDER BY name",
            [department]
          );

      res.json(users.rows);
    } catch (error) {
      console.log("get user failed:", error);
      res.status(500).json({ error: "Get user failed" });
    }
  }
);

///
export default router;

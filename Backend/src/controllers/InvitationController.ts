import express, { Express, Request, Response } from "express";
import dbpool from "../../db";
import authenticateToken from "../middlewares/auth";
import { Invitation, User } from "../types";
import { invitationSchema } from "../validators";
const router = express.Router();

//* Insert invitations to invitations table
router.post("/insert-invitations", async (req: Request, res: Response) => {
  try {
    const { invitedUserArr, survey_id } = invitationSchema.parse(req.body);
    invitedUserArr.forEach(async (user) => {
      await dbpool.query(
        "INSERT INTO public.invitations (survey_id, user_id, state) VALUES($1, $2, $3) RETURNING id",
        [survey_id, user.id, false]
      );
    });
    res.status(200).json({ message: "Invitation sent" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ups.. Something went wrong! (code:500)" });
  }
});
//* Get all invitations of current user
router.get(
  "/get-invitations",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { id } = req.user as User;
    try {
      const invitations = await dbpool.query(
        "SELECT * FROM invitations WHERE user_id = $1",
        [id]
      );
      res.json(invitations.rows);
    } catch (error) {
      console.log("get user failed:", error);
      res.status(500).json({ error: "Get user failed" });
    }
  }
);

router.get(
  "/get-invitations-table",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.user as User;
      const invitationArr = await dbpool.query(
        "SELECT * FROM invitations WHERE user_id = $1",
        [id]
      );

      const surveyExtendedArr = await Promise.all(
        invitationArr.rows.map(async (invitation: Invitation) => {
          const survey = await dbpool.query(
            "SELECT * FROM surveys WHERE id = $1",
            [invitation.survey_id]
          );
          const user = await dbpool.query("SELECT * FROM users WHERE id = $1", [
            survey.rows[0].owner_id,
          ]);
          return {
            ...survey.rows[0],
            invitation_id: invitation.id,
            state: invitation.state,
            nameSurname: user.rows[0].name + " " + user.rows[0].surname,
          };
        })
      );

      res.json(surveyExtendedArr);
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ error: "Failed to get survey by invitation" });
    }
  }
);

//* Update invitation state
router.post("/updateinvitationstate", async (req, res) => {
  try {
    const { invitation_id } = req.body;
    await dbpool.query("UPDATE invitations SET state = true WHERE id = $1", [
      invitation_id,
    ]);
    res.json({ message: "Invitation state updated" });
  } catch (error) {
    console.log("update invitation state failed:", error);
    res.status(500).json({ error: "Update invitation state failed" });
  }
});

export default router;

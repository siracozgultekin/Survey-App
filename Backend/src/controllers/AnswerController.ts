import express, { Request, Response } from "express";
import dbpool from "../../db";
import authenticateToken from "../middlewares/auth";
import { Answer } from "../types";

const router = express.Router();

//*Create answer objects in database
router.post("/answers", async (req, res) => {
  try {
    const answersArr = req.body;
    answersArr.forEach(async (answer: Answer) => {
      await dbpool.query(
        "INSERT INTO public.answers (id, question_id, survey_id, user_id, answer) VALUES($1, $2, $3, $4, $5)",
        [
          answer.id,
          answer.question_id,
          answer.survey_id,
          answer.user_id,
          answer.answer,
        ]
      );
    });

    res.json({ message: "Answers inserted into their tables" });
  } catch (error) {
    console.log("insert answers failed:", error);
    res.status(500).json({ error: "Insert answers failed" });
  }
});
//* Get all answers of a question by question id
router.get(
  "/getallanswers/:question_id",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const question_id = req.params.question_id;
      const answers = await dbpool.query(
        "SELECT * FROM answers where question_id = $1",
        [question_id]
      );
      res.json(answers.rows);
    } catch (error) {
      console.log("get answers failed:", error);
      res.status(500).json({ error: "Get answers failed" });
    }
  }
);
export default router;

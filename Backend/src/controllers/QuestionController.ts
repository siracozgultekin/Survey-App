import express, { Request, Response } from "express";
import dbpool from "../../db";
import authenticateToken from "../middlewares/auth";
import { Answer, Question, Survey, User } from "../types";

const router = express.Router();

//* Get questions and their answers of a survey by survey id
router.get(
  "/questions-with-their-answers/:survey_id",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const survey_id = req.params.survey_id;
      const questions = await dbpool
        .query("SELECT * FROM questions where survey_id = $1", [survey_id])
        .then(async (result: any) => {
          const questions = result.rows;
          const questionsWithAnswers = await Promise.all(
            questions.map(async (question: Question) => {
              const answers = await dbpool.query(
                "SELECT * FROM answers WHERE question_id = $1",
                [question.id]
              );
              if (question.question_type === "2") {
                const choicesWithCounts = question.choices.map((choice) => {
                  let count = 0;
                  answers.rows.map((answerobj: Answer) => {
                    answerobj.answer.map((givenAnswer) => {
                      if (givenAnswer === choice) {
                        count++;
                      }
                    });
                  });
                  return { choice: choice, count: count };
                });
                return {
                  ...question,
                  choicesWithCounts,
                  answers: answers.rows,
                };
              } else if (question.question_type === "3") {
                //take all answers of this question and calculate the average of them then return it in same format as choicesWithCounts
                let sum = 0;
                answers.rows.map((answerobj: Answer) => {
                  sum = sum + parseInt(answerobj.answer[0]);
                });
                const choicesWithCounts = [
                  {
                    choice: "Puanlama",
                    count: sum / answers.rows.length,
                  },
                ];
                return {
                  ...question,
                  choicesWithCounts,
                  answers: answers.rows,
                };
              }
            })
          );

          return questionsWithAnswers;
        });
      res.json(questions);
    } catch (error) {
      console.log("get user failed:", error);
      res.status(500).json({ error: "Get user failed" });
    }
  }
);
//* Get questions of a survey by survey id
router.get(
  "/questions/:survey_id",
  authenticateToken,
  async (req: Request, res: Response) => {
    const surveyid = req.params.survey_id;
    try {
      const questionArr = await dbpool.query(
        "SELECT * FROM questions WHERE survey_id= $1",
        [surveyid]
      );

      res.json(questionArr.rows);
    } catch (error) {
      console.log("get user failed:", error);
      res.status(500).json({ error: "Get user failed" });
    }
  }
);

export default router;

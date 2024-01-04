import express, { Request, Response } from "express";
import { ZodError } from "zod";
import dbpool from "../../db";
import authenticateToken from "../middlewares/auth";
import { User } from "../types";
import { insertSurveySchema } from "../validators";

const router = express.Router();

//*insert survey and questions into database
router.post(
  "/Insert-survey-and-questions",
  async (req: Request, res: Response) => {
    try {
      const {
        id,
        owner_id,
        creation_date,
        deadline,
        description,
        participants,
        title,
        questions,
        is_active,
      } = insertSurveySchema.parse(req.body.dataSent);
      const newSurvey = await dbpool.query(
        "INSERT INTO public.surveys (id, owner_id, title, description, creation_date, deadline, participants) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id",
        [
          id,
          owner_id,
          title,
          description,
          creation_date,
          deadline,
          participants,
        ]
      );

      for (let i = 0; i < questions.length; i++) {
        await dbpool.query(
          "INSERT INTO public.questions (id, survey_id, question, question_type, choices) VALUES($1, $2, $3, $4, $5)",
          [
            questions[i].id,
            questions[i].survey_id,
            questions[i].question,
            questions[i].question_type,
            questions[i].choices,
          ]
        );
      }

      res
        .status(200)
        .json({ message: "Survey and questions inserted into their tables" });
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Ups.. Something went wrong!" });
    }
  }
);

//* Get a survey by id

router.get("/get-surveys/:id", async (req: Request, res: Response) => {
  const surveyid = req.params.id;

  try {
    const survey = await dbpool.query("SELECT * FROM surveys WHERE id= $1", [
      surveyid,
    ]);

    res.json(survey.rows[0]);
  } catch (error) {
    console.log("get survey failed:", error);
    res.status(500).json({ error: "Get user failed" });
  }
});
//* Get last 6 surveys of current user
router.get(
  "/get-my-latest-surveys",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { id } = req.user as User;

    try {
      const mySurveys = await dbpool.query(
        "SELECT * FROM surveys WHERE owner_id = $1 ORDER BY creation_date DESC LIMIT 6",
        [id]
      );
      res.json(mySurveys.rows);
    } catch (error) {
      console.log("get user failed:", error);
      res.status(500).json({ error: "Get user failed" });
    }
  }
);
//* Get all surveys of current user
router.get(
  "/get-my-surveys",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { id } = req.user as User;

    try {
      const mySurveys = await dbpool.query(
        "SELECT * FROM surveys WHERE owner_id = $1 ",
        [id]
      );
      res.json(mySurveys.rows);
    } catch (error) {
      console.log("get user failed:", error);
      res.status(500).json({ error: "Get user failed" });
    }
  }
);
//* Get all surveys of current user in table format
router.get(
  "/tablemysurvey",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { id } = req.user as User;

    try {
      const mySurveys = await dbpool.query(
        `
      SELECT 
    id, 
    creation_date, 
    title, 
    deadline, 
    COALESCE(CAST(array_length(participants, 1) AS INTEGER), 0) AS "numberOfParticipants",
    CASE 
        WHEN deadline > CURRENT_TIMESTAMP THEN 'active'
        ELSE 'closed'
    END AS status
FROM 
    surveys
WHERE 
    owner_id = $1;
    `,
        [id]
      );

      res.json(mySurveys.rows);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);
//* Get all surveys that current user participated in table format
router.get(
  "/tableparticipatedsurvey",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { id } = req.user as User;

    try {
      const participatedSurveys = await dbpool.query(
        `
        SELECT 
        s.id, 
        s.title,
        s.creation_date,
        CONCAT(u.name, ' ', u.surname) AS owner_name,
        s.deadline, 
        CASE 
            WHEN s.deadline > CURRENT_TIMESTAMP THEN 'active'
            ELSE 'closed'
        END AS status
    FROM
        surveys s
    JOIN
        users u ON s.owner_id = u.id
    WHERE 
        $1 = ANY(s.participants);
    
    `,
        [id]
      );

      res.json(participatedSurveys.rows);
    } catch (error) {
      console.log("error=>", error);
      res.status(500).json({ error: error });
    }
  }
);
//* Insert  survey id into participated_surveys column of users table and user id into participants column of surveys table
router.post("/insertparticipatedsurvey", async (req, res) => {
  const { survey_id, user_id } = req.body;
  try {
    //insert survey_id(request) into participated_surveys column of users table
    await dbpool
      .query(
        "UPDATE users SET participated_surveys = array_append(participated_surveys, $1) WHERE id = $2 ",
        [survey_id, user_id]
      )
      .then(async () => {
        await dbpool.query(
          "UPDATE surveys SET participants = array_append(participants, $1) WHERE id = $2 ",
          [user_id, survey_id]
        );
      });
    res.json({
      message: "Survey id inserted into participated_surveys column",
    });
  } catch (error) {
    console.log("get user failed:", error);
    res.status(500).json({ error: "Get user failed" });
  }
});
///

export default router;

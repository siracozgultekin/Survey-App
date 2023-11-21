import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import dbpool from "./db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerSchema, insertSurveySchema } from "./validators";
import { ZodError } from "zod";
import authenticateToken from "./middlewares/auth";
import cookieParser from "cookie-parser";
import { Survey, Question } from "./types";
const app: Express = express();

dotenv.config();

//middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());

//signout endpoint
app.post("/logout", (req: Request, res: Response) => {
  console.log("first line of logout");
  try {
    res.clearCookie("token").json({ message: "Log out successful" });
    // localStorage.clear();
  } catch (error) {
    console.error("Log out failed:", error);
    res.status(500).json({ error: "Log out failed, try again" });
  }
});

//Register enpdoint
app.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, surname, email, password, department } = registerSchema.parse(
      req.body
    );

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const newUser = await dbpool.query(
      "INSERT INTO public.users (is_admin, name, surname, password, email, department) VALUES($1, $2, $3, $4, $5, $6) RETURNING id",
      [false, name, surname, hashedPassword, email, department]
    );
    console.log("buraya geliyo");

    const userId = newUser.rows[0].id;

    const token = jwt.sign({ userId }, hashedPassword, {
      expiresIn: "8h", // Token expiration time
    });

    res.json({ token });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error: error.errors });
    }

    res.status(500).json({ message: "Registration failed" });
  }
});
//insert survey object  into database
app.post("/survey", async (req: Request, res: Response) => {
  console.log(req.body.dataSent);
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
    } = insertSurveySchema.parse(req.body.dataSent);
    const newSurvey = await dbpool.query(
      "INSERT INTO public.surveys (id, owner_id, title, description, creation_date, deadline, participants) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id",
      [id, owner_id, title, description, creation_date, deadline, participants]
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
      console.log("hocam şimdi de zod tipinde hata var");
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: "Ups.. Something went wrong!" });
  }
});

//Login enpdoint
app.post("/login", async (req: Request, res: Response) => {
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

// app.get("/currentuser/:id", async (req: Request, res: Response) => {
//   const userid = req.params.id;
//   console.log(`userid: ${userid}`);
//   try {
//     const user = await dbpool.query("SELECT * FROM users WHERE id = $1", [
//       userid,
//     ]);
//     res.json(user.rows[0]);
//   } catch (error) {
//     console.log("get user failed:", error);
//     res.status(500).json({ error: "Get user failed" });
//   }
// });

app.get("/surveys/:id", async (req: Request, res: Response) => {
  const surveyid = req.params.id;
  console.log(`surveyid: ${surveyid}`);
  try {
    const survey = await dbpool.query("SELECT * FROM surveys WHERE id= $1", [
      surveyid,
    ]);
    console.log("e burası başarılı oldu");
    console.log("survey.rows=>", survey.rows);
    res.json(survey.rows);
  } catch (error) {
    console.log("get user failed:", error);
    res.status(500).json({ error: "Get user failed" });
  }
});

app.get("/users/:department", async (req: Request, res: Response) => {
  const department = req.params.department;
  try {
    const users = await dbpool.query(
      "SELECT * FROM users WHERE department = $1",
      [department]
    );
    res.json(users.rows);
  } catch (error) {
    console.log("get user failed:", error);
    res.status(500).json({ error: "Get user failed" });
  }
});

app.get(
  "/mySurveys",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { id } = req.body.user;

    try {
      const mySurveys = await dbpool.query(
        "SELECT * FROM surveys WHERE owner_id = $1 LIMIT 6",
        [id]
      );
      res.json(mySurveys.rows);
    } catch (error) {
      console.log("get user failed:", error);
      res.status(500).json({ error: "Get user failed" });
    }
  }
);

app.get(
  "/tablemysurvey",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { id } = req.body.user;

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

app.get(
  "/tableparticipatedsurvey",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { id } = req.body.user;

    try {
      const participatedSurveys = await dbpool.query(
        `
        SELECT 
        s.id, 
        s.title,
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
      res.status(500).json({ error: error });
    }
  }
);
app.get(
  "/currentuser",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { id } = req.body.user;
    console.log("usermi=> ", req.body.user.id);

    try {
      const userQuery = await dbpool.query(
        "SELECT * FROM users WHERE id = $1",
        [id]
      );

      if (!userQuery.rows[0]) {
        return res.status(401).json({ error: "User not found" });
      }

      console.log(userQuery.rows[0]);
      const user = userQuery.rows[0];
      const _partipatedSurveys = user.participated_surveys;

      console.log("participated_surveys=>", _partipatedSurveys);

      let participatedSurveys: Survey[] = [];
      for (let i = 0; i < _partipatedSurveys.length; i++) {
        const surveyQuery = await dbpool.query(
          "SELECT * FROM surveys WHERE id = $1",
          [_partipatedSurveys[i]]
        );
        const surveyOwnerQuery = await dbpool.query(
          "SELECT * FROM users WHERE id = $1",
          [surveyQuery.rows[0].owner_id]
        );

        const survey = {
          ...surveyQuery.rows[0],
          owner: {
            name: surveyOwnerQuery.rows[0].name,
            surname: surveyOwnerQuery.rows[0].surname,
          },
        };

        participatedSurveys.push(survey);
      }

      res.status(200).json({ user, participatedSurveys });
    } catch (error) {
      console.log("get user failed:", error);
      res.status(500).json({ error: "Get user failed" });
    }
  }
);

app.delete("/removeuser", async (req: Request, res: Response) => {
  // Kullanıcıyı veritabanından silin
  const userid = req.body.id;
  try {
    const ok = await dbpool.query("DELETE FROM users WHERE id = $1", [userid]);
  } catch (error) {
    console.log("delete failed:", error);
  }

  res.json({ message: "User deleted" });
});

app.get("/profile", authenticateToken, (req: Request, res: Response) => {
  // Kullanıcının profilini döndürün veya işlem yapın
  const { payload } = req.body;
  console.log(payload?.user);

  res.json({ user: payload });
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});

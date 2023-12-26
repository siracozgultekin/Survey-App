import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import dbpool from "./db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  registerSchema,
  insertSurveySchema,
  invitationSchema,
} from "./validators";
import { ZodError } from "zod";
import authenticateToken from "./middlewares/auth";
import cookieParser from "cookie-parser";
import { Survey, Question, Invitation, Answer, User } from "./types";
const app: Express = express();

dotenv.config();
export interface SurveyWithInvitation extends Survey {
  invitation_id: string;
  state: boolean;
}
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
app.post(
  "/register",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const { name, surname, email, password, department, is_admin } =
        registerSchema.parse(req.body);

      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);
      const newUser = await dbpool.query(
        "INSERT INTO public.users (is_admin, name, surname, password, email, department, participated_surveys) VALUES($1, $2, $3, $4, $5, $6,$7) RETURNING id",
        [is_admin, name, surname, hashedPassword, email, department, []]
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
  }
);

app.get(
  "/getallquestions/:survey_id",
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
              console.log("answers.rows=>", answers.rows);
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
          console.log(
            "questionsWithAnswesaars=>",
            questionsWithAnswers[0].answers[0]
          );
          return questionsWithAnswers;
        });
      console.log("qyestions=>", questions);
      res.json(questions);
    } catch (error) {
      console.log("get user failed:", error);
      res.status(500).json({ error: "Get user failed" });
    }
  }
);
app.get(
  "/getallanswers/:question_id",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      console.log("buradadada");
      const question_id = req.params.question_id;
      const questions = await dbpool.query(
        "SELECT * FROM answers where question_id = $1",
        [question_id]
      );
      res.json(questions.rows);
    } catch (error) {
      console.log("get user failed:", error);
      res.status(500).json({ error: "Get user failed" });
    }
  }
);

app.post("/invitation", async (req: Request, res: Response) => {
  try {
    const { invitedUserArr, survey_id } = invitationSchema.parse(req.body);
    console.log("invitedUserArr=>", invitedUserArr);
    console.log("survey_id=>", survey_id);
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

app.get(
  "/invitations",
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
      is_active,
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
app.post("/survey", async (req, res) => {
  const surveyIDArr = req.body;

  try {
    const surveyPromises = surveyIDArr.map(async (surveyID: string) => {
      const survey = await dbpool.query("SELECT * FROM surveys WHERE id= $1", [
        surveyID,
      ]);
      return survey.rows[0]; // Sadece ilk satırı döndürmek, varsa
    });

    const surveyResults = await Promise.all(surveyPromises);
    res.json(surveyResults);
  } catch (error) {
    console.log("get survey failed:", error);
    res.status(500).json({ error: "Get survey failed" });
  }
});
//create an endpoint to update password
app.post(
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
        return res.status(401).json({ error: "Geçersiz Eski Şifre" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

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

//Create answer objects in database
app.post("/answers", async (req, res) => {
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
    //.then(async() => {
    //   try {
    //     const { invitation_id } = req.body;
    //     await dbpool.query("UPDATE invitations SET state = true WHERE id = $1", [
    //       invitation_id,
    //     ]);
    //     res.json({ message: "Invitation state updated" });
    //   } catch (error) {
    //     console.log("update invitation state failed:", error);
    //     res.status(500).json({ error: "Update invitation state failed" });
    //   }});
    res.json({ message: "Answers inserted into their tables" });
  } catch (error) {
    console.log("insert answers failed:", error);
    res.status(500).json({ error: "Insert answers failed" });
  }
});
app.post("/updateinvitationstate", async (req, res) => {
  try {
    const { invitation_id } = req.body;
    console.log("invitation_id=>", invitation_id);
    console.log("req.body=>", req.body);
    await dbpool.query("UPDATE invitations SET state = true WHERE id = $1", [
      invitation_id,
    ]);
    res.json({ message: "Invitation state updated" });
  } catch (error) {
    console.log("update invitation state failed:", error);
    res.status(500).json({ error: "Update invitation state failed" });
  }
});
app.post("/surveysbyinvitation/", async (req, res) => {
  try {
    const invitationArr: Invitation[] = req.body.invitations;

    const surveyExtendedArr = await Promise.all(
      invitationArr.map(async (invitation) => {
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
});

app.get("/surveys/:id", async (req: Request, res: Response) => {
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
app.get("/questions/:id", async (req: Request, res: Response) => {
  const surveyid = req.params.id;
  console.log(`surveyidquestion: ${surveyid}`);
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
});
app.get(
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

app.get(
  "/mySurveys",
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
app.get(
  "/getparticipatedsurveys",
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
app.get(
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

app.get(
  "/tableparticipatedsurvey",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { id } = req.user as User;

    try {
      console.log("id=>", id);
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
      console.log("participatedSurveys=====>", participatedSurveys.rows);

      res.json(participatedSurveys.rows);
    } catch (error) {
      console.log("error=>", error);
      res.status(500).json({ error: error });
    }
  }
);
app.post("/insertparticipatedsurvey", async (req, res) => {
  const { survey_id, user_id } = req.body;
  try {
    console.log("req.bodyforparticipatedsurvey=>", survey_id);
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

app.get(
  "/currentuser",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { id } = req.user as User;

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
  const user = req.user as User;

  res.json({ user: user });
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});

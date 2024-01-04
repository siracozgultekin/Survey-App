import express, { Express } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import {
  AnswerController,
  AuthController,
  InvitationController,
  QuestionController,
  SurveyController,
  UserController,
} from "./src/controllers";

const app: Express = express();
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/auth", AuthController);
app.use("/user", UserController);
app.use("/question", QuestionController);
app.use("/invitation", InvitationController);
app.use("/answer", AnswerController);
app.use("/survey", SurveyController);

app.listen(5000, () => {
  console.log("listening on port 5000");
});

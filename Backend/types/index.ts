import { Request } from "express-serve-static-core";

export interface Survey {
  id: string;
  owner_id: string;
  title: string;
  description: string;
  creation_date: Date;
  deadline: Date;
  participants: string[];
}

export interface Invitation {
  id: string;
  user_id: string;
  survey_id: string;
  state: boolean;
}

export type User = {
  id: string;
  is_admin: false;
  name: string;
  surname: string;
  email: string;
  password: string;
  registration_date: Date;
  participated_surveys: string[];
};

export interface Question {
  id: string;
  survey_id: string;
  question: string;
  question_type: string;
  choices: string[];
}
export interface Answer {
  id: string;
  question_id: string;
  survey_id: string;
  user_id: string;
  answer: string[];
}
// export interface SurveyWithQuestions {
//   id: string;
//   owner_id: string;
//   title: string;
//   description: string;
//   creation_date: Date;
//   deadline: Date;
//   participants: string[];
//   questions: Question[];
// }

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
export interface Question {
  id: string;
  survey_id: string;
  question: string;
  question_type: number;
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

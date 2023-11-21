type User = {
  id: string;
  is_admin: false;
  name: string;
  surname: string;
  email: string;
  password: string;
  registration_date: string;
  participated_surveys: string[];
  department: string;
};
export type { User };
export interface Survey {
  id: string;
  owner_id: string;
  title: string;
  description: string;
  creation_date: Date | null;
  deadline: Date | null;
  participants: string[];
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
  owner_question_id: string;
  owner_survey_id: string;
  owner_user_id: string;
  answer: string[];
}

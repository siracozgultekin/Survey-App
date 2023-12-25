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
  is_active: boolean;
}

export interface Question {
  id: string;
  survey_id: string;
  question: string;
  question_type: string;
  choices: string[];
}
export interface ExtendedQuestion extends Question {
  choicesWithCounts: {
    choice: string;
    count: number;
  }[];
  answers: Answer[];
}
export interface Answer {
  id: string;
  question_id: string;
  survey_id: string;
  user_id: string;
  answer: string[];
}
